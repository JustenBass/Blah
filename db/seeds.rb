puts "Seeding data...💦"
#Users
user1 = User.create!(username: "JBass6036", password: "$2a$10$HjEUPNJuuQ2Dz3M8jcLykuVtBpdGpoU0BkMt1cQqdqr487J4BbUSu", password_confirmation: "$2a$10$HjEUPNJuuQ2Dz3M8jcLykuVtBpdGpoU0BkMt1cQqdqr487J4BbUSu") #moon
user2 = User.create!(username: "Zee8080", password: "$2a$10$tTt7w1BePoAHghRNjxAVlu1OIPLomWm1axMl1xqQSeD3xy9OmgoO2", password_confirmation: "$2a$10$tTt7w1BePoAHghRNjxAVlu1OIPLomWm1axMl1xqQSeD3xy9OmgoO2") #sun
user3 = User.create!(username: "PerezBradshaw", password: "$2a$10$/pZ08kGPWVKaITtGiv8zAeWUO7vIqBs0b.o1wphqd0HdjEPu4VCPy", password_confirmation: "$2a$10$/pZ08kGPWVKaITtGiv8zAeWUO7vIqBs0b.o1wphqd0HdjEPu4VCPy") #star
user4 = User.create!(username: "Smiley_Girl_108", password: "$2a$10$d.fuoG3xc.gDIaoWpC.vpO3k5vnTbgzi5xpRYIiLj27n.5XUuhP76", password_confirmation: "$2a$10$d.fuoG3xc.gDIaoWpC.vpO3k5vnTbgzi5xpRYIiLj27n.5XUuhP76") #venus


 #Blogs
 blog1 = Blog.create!(image: "https://hips.hearstapps.com/hmg-prod/images/jennifer-lopez-and-ben-affleck-bgus-2341997-001-1648225918.jpg", title: "IS LOVE STILL IN THE AIR FOR BENNIFER?", description: "Jennifer Lopez and Ben Affleck might seem like the picture perfect couple but sources say the couple might be falling apart as of late.", trending: false)
 blog2 = Blog.create!(image: "https://assets.vogue.com/photos/5d0d1b00cdcf853aa0de12c4/master/w_2560%2Cc_limit/00-story-lizzo.jpg", title: "LIZZO RETURNS TO SOCIAL MEDIA FOR THR FIRST TIME AFTER DANCER LAWSUIT.", description: "description2", trending: false)
 blog3 = Blog.create!(image: "https://assets.vogue.com/photos/626bd0d27b13ad82c0acc178/16:9/w_1280,c_limit/rev-1-Barbie-InstaVert_High_Res_JPEG.jpeg", title: "EVERYTHING YOU NEED TO KNOW ABOUT BARBIE", description: "description3", trending: false)
 blog4 = Blog.create!(image: "https://media.cnn.com/api/v1/images/stellar/prod/230719143858-beyonce-renaissance-tour-file-062723.jpg?c=16x9&q=h_720,w_1280,c_fill", title: "BEYONCE RUMORED TO EXTEND RENAISSANCE TOUR.", description: "description4", trending: true)
 blog5 = Blog.create!(image: "https://static.independent.co.uk/2023/02/16/13/16112124-167c08a5-90ae-407e-a10c-46c3784cbbf1.jpg", title: "RHIHANNA AND ASAP WELCOME BABY #2.", description: "description5", trending: true)
 blog6 = Blog.create!(image: "https://www.billboard.com/wp-content/uploads/2023/08/miley-cyrus-01-press-2023-billboard-1548.jpg?w=942&h=623&crop=1", title: "MILEY TEASES NEW SINGLE.", description: "description6", trending: true)
 blog7 = Blog.create!(image: "https://www.usmagazine.com/wp-content/uploads/2022/09/Kim-Why-There-Is-No-Promo-The-Kardashians-Season-2-Premiere.jpg?w=1600&quality=86&strip=all", title: "WILL 'THE KARDASHIANS EVER END?", description: "description7", trending: false)
 blog8 = Blog.create!(image: "https://pagesix.com/wp-content/uploads/sites/3/2023/07/1jpg-5.jpg?quality=75&strip=all&w=1024", title: "CARDI B. THROWS MIC AT FAN.", description: "description8", trending: true)


 #Reviews
#everyone has at least 2 items (We have a category of dresses, jackets, pants, jewlery, purses, glasses, home)
Comment.create!(comment: "This just seems like a toxic relationship!", user_id: user1.id, blog_id: blog1.id)
Comment.create!(comment: "It's hard to imagine Lizzo would be capable of doing this!", user_id: user1.id, blog_id: blog2.id)
Comment.create!(comment: "This movie 💋 #TeamWierdBarbie", user_id: user2.id, blog_id: blog3.id)
Comment.create!(comment: "Beyonce is imortal I swear!", user_id: user2.id, blog_id: blog4.id)
Comment.create!(comment: "Most beautiful couple out there! Still waiting for RiRi to drop new music though...", user_id: user3.id, blog_id: blog5.id)
Comment.create!(comment: "Miley Cyrus has come so far since her Disney days. I have to admit she is one of the best vocalist of this generation.", user_id: user3.id, blog_id: blog6.id)
Comment.create!(comment: "I was content when they ended 'Keeping Up With The Kardashians' but as time went on I did miss seeing them on tv. I was so happy to hear they were coming back on Hulu!", user_id: user4.id, blog_id: blog7.id)
Comment.create!(comment: "Gurrrlll I would have done the same thing!!!! 🎤", user_id: user4.id, blog_id: blog8.id)

puts "Done seeding...🌱"