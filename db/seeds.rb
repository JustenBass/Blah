puts "Seeding data...💦"
#Users
user1 = User.create!(avatar: 'https://www.cheatsheet.com/wp-content/uploads/2022/04/Megan-Thee-Stallion-white.jpg?strip=all&quality=89', username: "JBass6036", password: "$2a$10$HjEUPNJuuQ2Dz3M8jcLykuVtBpdGpoU0BkMt1cQqdqr487J4BbUSu", password_confirmation: "$2a$10$HjEUPNJuuQ2Dz3M8jcLykuVtBpdGpoU0BkMt1cQqdqr487J4BbUSu") #moon
user2 = User.create!(avatar: 'https://m.media-amazon.com/images/I/61Y18wJ9pFL._AC_UF894,1000_QL80_.jpg', username: "Zee8080", password: "$2a$10$tTt7w1BePoAHghRNjxAVlu1OIPLomWm1axMl1xqQSeD3xy9OmgoO2", password_confirmation: "$2a$10$tTt7w1BePoAHghRNjxAVlu1OIPLomWm1axMl1xqQSeD3xy9OmgoO2") #sun
user3 = User.create!(avatar: 'https://www.byrdie.com/thmb/WA6l9BfXaOU5mmZD1xnxrZbcFpA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/326117690_1612808549157766_1209677282625688476_n-1045defb986d4f9e826720b737e56a41.jpg', username: "PerezBradshaw", password: "$2a$10$/pZ08kGPWVKaITtGiv8zAeWUO7vIqBs0b.o1wphqd0HdjEPu4VCPy", password_confirmation: "$2a$10$/pZ08kGPWVKaITtGiv8zAeWUO7vIqBs0b.o1wphqd0HdjEPu4VCPy") #star
user4 = User.create!(avatar: 'https://ih1.redbubble.net/image.2525903122.0027/st,small,507x507-pad,600x600,f8f8f8.jpg', username: "Smiley_Girl_108", password: "$2a$10$d.fuoG3xc.gDIaoWpC.vpO3k5vnTbgzi5xpRYIiLj27n.5XUuhP76", password_confirmation: "$2a$10$d.fuoG3xc.gDIaoWpC.vpO3k5vnTbgzi5xpRYIiLj27n.5XUuhP76") #venus


 #Blogs
 blog1 = Blog.create!(image: "https://www.eatthis.com/wp-content/uploads/sites/4/2022/03/zoe-kravitz-1.jpg?quality=82&strip=all", title: "ZOE KRAVITZ RETURNING FOR HIGH FIDELITY", blog: "Article Section", trending: false)
 blog2 = Blog.create!(image: "https://assets.vogue.com/photos/5d0d1b00cdcf853aa0de12c4/master/w_2560%2Cc_limit/00-story-lizzo.jpg", title: "LIZZO RETURNS TO SOCIAL MEDIA FOR THE FIRST TIME AFTER DANCER LAWSUIT.", blog: "Article Section", trending: false)
 blog3 = Blog.create!(image: "https://www.parents.com/thmb/Z8dMuN7YOPU6JSG8m7IwhZJbC3E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rev-1-BAR-FP-0129r_High_Res_JPEG-crop-a08adc4d393743d7a582ac2dded603fe.jpg", title: "EVERYTHING YOU NEED TO KNOW ABOUT BARBIE.", blog: "Article Section", trending: false)
 blog4 = Blog.create!(image: "https://media.cnn.com/api/v1/images/stellar/prod/230719143858-beyonce-renaissance-tour-file-062723.jpg?c=16x9&q=h_720,w_1280,c_fill", title: "BEYONCE RUMORED TO EXTEND RENAISSANCE TOUR.", blog: "Article Section", trending: true)
 blog5 = Blog.create!(image: "https://static.independent.co.uk/2023/02/16/13/16112124-167c08a5-90ae-407e-a10c-46c3784cbbf1.jpg", title: "RIHANNA AND ASAP WELCOME BABY #2.", blog: "Article Section", trending: true)
 blog6 = Blog.create!(image: "https://www.billboard.com/wp-content/uploads/2023/08/miley-cyrus-01-press-2023-billboard-1548.jpg?w=942&h=623&crop=1", title: "MILEY TEASES NEW SINGLE.", blog: "Article Section", trending: true)
 blog7 = Blog.create!(image: "https://www.usmagazine.com/wp-content/uploads/2022/09/Kim-Why-There-Is-No-Promo-The-Kardashians-Season-2-Premiere.jpg?w=1600&quality=86&strip=all", title: "WILL THE KARDASHIANS EVER END?", blog: "Article Section", trending: false)
 blog8 = Blog.create!(image: "https://pagesix.com/wp-content/uploads/sites/3/2023/07/1jpg-5.jpg?quality=75&strip=all&w=1024", title: "CARDI B. THROWS MIC AT FAN.", blog: "Article Section", trending: true)


 #Reviews
#everyone has at least 2 items (We have a category of dresses, jackets, pants, jewlery, purses, glasses, home)
Comment.create!(comment: "I low key am obsessed with her!", user_id: user1.id, blog_id: blog1.id)
Comment.create!(comment: "It's hard to imagine Lizzo would be capable of doing this!", user_id: user1.id, blog_id: blog2.id)
Comment.create!(comment: "This movie 💋 #TeamWierdBarbie", user_id: user2.id, blog_id: blog3.id)
Comment.create!(comment: "Beyonce is imortal I swear!", user_id: user2.id, blog_id: blog4.id)
Comment.create!(comment: "Most beautiful couple out there! Still waiting for RiRi to drop new music though...", user_id: user3.id, blog_id: blog5.id)
Comment.create!(comment: "Miley Cyrus has come so far since her Disney days. I have to admit she is one of the best vocalist of this generation.", user_id: user3.id, blog_id: blog6.id)
Comment.create!(comment: "I was content when they ended 'Keeping Up With The Kardashians' but as time went on I did miss seeing them on tv. I was so happy to hear they were coming back on Hulu!", user_id: user4.id, blog_id: blog7.id)
Comment.create!(comment: "Gurrrlll I would have done the same thing!!!! 🎤", user_id: user4.id, blog_id: blog8.id)

puts "Done seeding...🌱"