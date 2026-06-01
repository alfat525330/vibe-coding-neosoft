// this is for e-commerce related prompt//

Role: Act as full stack developer with 6+years of experience.
Task:
1. user roles
- admin
- subadmin
- user
2. user authentication flow
- signup
- login
- reset password
- logout
- changepassword
- refresh token 
- role base authentication 
- protected route
- role base modules
3. admin
- dashboard
- All type of module management (user, product, sales, blog, advertisement, banners, offers, wallet, cart, history, reviews, wishlist).
- user: (
    - all users list include (active, unverified, banned, inactive)
    - user details include (user, purchase, adrress, payment history, card details)
    - proxy login 
)
- product: (
    - crud 
    - product list ( filter: In stock, out of stock, quality check fail, damaged)
    - Product Details (total stock, stock sold, stock remain, review on product, earning from product)
)
- sales: (
    - list (product sale, income, expencise, loss)
)
- blog: (crud)
- advertisement:(
    - crud (add time and date on which it visible or hide)
)
- banner: (
    - types ( PC, mobile, tab)
    - position (head slider, bottom slider)
    - crud (for frontent sliders)
)
- offers:(
    - crud ( percent/flat , on which product, time and day limit, number of time applicable on users)
)
- wallet (
    - user list with balance 
    - wallet details of each user include( added, withdraw, refund, purchase, send)
)
- cart (
    - user cart list with details
)
- history (
    - user purchase history list
    - purchase return list
    - order unaccepted list
)
- review (
    - product review list
)
- wishlist (
    - user product wishlist
)
2. subadmin
- all data visible similar as admin but here no edit delete permission in any module
- no proxy login allowed
- wallet module will not visible here
3. user
- user profile (
    - update profile
    - view profile details
    - logout
)
- wallet ( 
    - balance 
    - history of where he/she spend 
    - add balance
)
- chart (
    - list of products
)
- wishlist (
    - list of products
)
- product list
- banners sliders
- offers list 
- purchase history
- address list
- payment mode or card added list
Context:
1. frontend 
- React.js latest version
- Redux for State management
- Use Fucntion components
- Manage Global error Handler
- Use Lazy load
- Axios for Api Communication
- Use virtual Scroll insted of Pagination
- Avoid unnecessory re-render components
- React Query
- resuable components
- Route protection
2. backend
- Node.js Latest version 22.0.0
- Express.js 
- sequelize Orm
- Migration and Seeders files
- javascript
- Send grid
- paypal/stripe/paytm
- google map service
- firebase notification
- protect headers
- protect cross site scripting
- protect SQL Injection
- thousand of user rush on same time
- request limit per minute
3. Note 
- Do not use deprecated libraries.
- use NPM.
- Only safe version of libraries take in use.

Format:
- well struched artichtect 
- folder structure
- sequlize model
- RestFul APIs
- migration file
- seeders file

// end e-commerce related prompt//

// real e-state related prompt started //

About this project we are creating tool where individual user can authenticate and post there property and sale with the help of this plat form. here large number of buyer and saler from any remote area can buy or sale property. this platform take some npminal amount of subscription to provide health and strong platform.
Role: Act as Full Stack Developer with 10+years of experience, need to create well structured web application.
Task:
1 User roles (admin, buyer, saler)

2 admin 
- dashboard
- All type of module management (user, Property, property sold, blog, advertisement, banners, offer, history, reviews, wishlist, subscribers,subscription plan).
- user: (
    - all users list include (active, unverified, banned, inactive)( filter : buyer/saler)
    - user details include (user, property history(sold property or buy property), adrress, payment history, card details)
    - proxy login 
)
- property: ( 
    - property list ( filter: sold, available)
    - property Details (user which is connect for partiqular property list of users )(chats room list where saler conversation with buyer)
)
- blog: (crud)
- advertisement: (crud)
- banners: (crud)
- subscription plan (
    - crud
)
- offer: (
    - crud ( offer creates for plan subscription)
)
- history: (
    - list of property which is sold
)
- reviews: (
    - list of review on properties
)
- wishlist: (
    - list of property which is user like for future
)
- subscribers: (
    - list of user with subcription details ( plan, start, expire,)
)

2. buyer
- dahboard
- property list
- wishlist property
- chatroom with property owner list
- history (purchased property list)
- subscription
- profile update
- submit proposal on property
- payment mode list
- legal documents list

3. saler
- dashboard
- self posted property
- recived proposal list
- chatroom
- history
- subsription
- profile update
- payment recived mode list 
- legal document list

Context:
1. Frontend
- Nuxt.js SSR
- pinia for statemanagement
- axios and fetch for api calling
- user different layout for different type of user
- paypal / stripe / paytm for payment gateway
- auth session
- tailwind css
- dynamic component load
- code split

2. backend
- Nest.js 
- Sequlize orm
- Typescript
- header protection
- sql injacktion
- cross site script
- rate-limit
- login history
- use dto validation
- interceptors
- auth guard
- swagger 

3. DB
- postgresql
- foreign key
- indexing
- relation

4. Note
- use only safe libraries
- avoid depricated libraries
- use best practice

Formate:
- use Industry level architecture
- Create folder structure
- Create Migration & seeder Files
- Db schema
- sequlize models
- RESTFULL APIs
- MySql 
- code optimisation
- lakh off user can access at same time


// real e-state related prompt end //


// kids virtual learning portal//

This project is about to provide virtual learn course to primary school students. according to there subject and standard. this tool will help student to deep understanding of subject and it is too help full. this tool charge on the basis of every single course. here teacher also record and upload videos to the course and earn some.

Role: Act as an Mern Stack developer with 10 years of industial experience. 

Task:
1. user role (
    - admin
    - teacher
    - student
)
2. user Authentication system (
    - login
    - register (student/teacher)
    - reset password
    - logout
    - changepassword
    - refresh token
    - jwt authenticate management
    - role base authenticate
)
2. admin (
    - dahboard
    - user management list ( 
        - teachers details(
            - user details
            - course list which he is created and earn.
            - history of total earning from created cource.
        )
        - student details(
            - user details
            - course list which he is paid for.
            - history of total spend on course.
        )
    )
    - cource (
        - crud
        - features ( review courses, publish courses, unpublish courses, outdated courses, draft courses)
    )
    - earning history (
        - list (all earning & expencise entries which student purchase and teacher recived)
        - balance sheet of credit and debit amount.
    )
    - cources price (
        - set cource price
        - also set number off screen can access at a time
        - type of screen can access cource
    )
    - offer (
        - set offer or discount on course (with expire and start date) (flat/percent) (applicable number of times on every students)
    )
    - teacher payment details(
        - list of active payment methods where teacher recive money or withdraw
        - list of secoundry payment methods 
    )
    - blog (crud)
)
2. teacher (
    - dashboard
    - created cource (
        - list of self created cource.
        - details
    )
    - create a cource(
        - create and record new course 
    )
    - verification pending cource (list)
    - draft course (list)
    - earning history and balance (
        - list of earning from each cource
        - withdraw earning list
    )
    - profile update
    - payment method (
        - list of added payment
        - create new payment method
        - active only one payment method at a time
    )
    - blog (
        - list
        - details
    )
    - logout
)
3. student (
    - dashboard
    - course (list) 
    - purchase or subscribe cource (list)
    - wishlist cource (list) 
    - expencise History (
        - list of expense where user pay for course
    )
    - blog (
        - list
        - details
    )
    - offers (list)
    - update profile
    - logout
)

Context:
1. frontend (
    - Next.js ssr with latest version
    - SSR and SSG
    - redux for state management
    - refresh token stratgies
    - persist state data 
    - app/ folder for file base route
    - user role base route permission and redirection
    - axios and fetch for api calling
    - Typescript

)
2. backend (
    - Nest.js with latest version
    - use guards for api access and role base
    - use interceptors for incoming request validation or set return response
    - use dto for api request validation
    - use middleware for use jwt check
    - query optimisation
    - sequelize orm
    - sequlize model
    - migration and seeder file
    - Typescript
    
)
3. DataBase (
    - MySql
    - indexing
    - foreign keys
    - db optimisation
    - create proper relation between tables
    - db-schema

)
4. Note (
    - use latest version of packages
    - don't use depricated packages or no mor maintained
    - use secure packages
    - code split
    - thousand of user will access this product same time
)

Formate :
- Industry level architecture
- create folder structure
- optimisation 
- RestFul APIs
- MySql
- db optimisation
- APIs response like
{
    status: true,
    message: "data found",
    respone: data,
}
- lakh off user can access at same time
- Create Migration & seeder Files
- Db schema
- sequlize models

// kids virtual learning portal end //