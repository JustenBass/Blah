import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';

export default function Settings() {
const { isAuthenticated, userError } = useContext(UserContext)

  if( isAuthenticated ){
    return(
      <div className='settingsParentDiv'>
        <br/>

        <div>
          <Link to="/updateUsernameForm">
            <button className="settingLinkButtons"> UPDATE USERNAME </button>
          </Link>
        </div>
        <br/>

        <div>
          <Link to="/updatePasswordForm">
            <button className="settingLinkButtons"> UPDATE PASSWORD </button>
           </Link>
        </div>
        <br/>

        <div>
          <Link to="/deactivateAccount">
            <button className="settingLinkButtons"> DEACTIVATE ACCOUNT </button>
           </Link>
        </div>
        <br/>
      </div>
    );
  } else {
    return (
      <div className='userErrorDiv'>
        <h3 className='userErrorFont'>{ userError }</h3>
      </div>
    )
  }
};
