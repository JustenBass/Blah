class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :raise_invalid_exception
  before_action :authorize


  private

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { error: ["You are not authorized to view this page. Please login or signup."] }, status: :unauthorized unless @current_user
end

def raise_invalid_exception(invalid)
  render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
end


end
