# Caching-Req | REDIS-CACHING

### SETUP
- To Use <strong>docker run -it --name \<your_name> -p  \<desired_port> : 4000 sourikg/caching</strong> to run the image
- To test make a <strong>GET</strong> request to <strong>' / '</strong> check if its working or not <em> -eg: localhost:4000</em> ***gives*** <em>" message " : " 🔥 "</em>

### Routes
- API endpoint to get all User  <strong>/api/user</strong>
 - There are total 10 users.
- To get only selected user as per id make a <strong>GET</strong> request to <strong>' /api/user/:userid '</strong> <em> Eg: localhost:4000/api/user/1</em> will give user_id 1 only
 - There are only **10 user** so replace **user_id** with ( 1 - 10 )


### Caching
- It only caches the result for ***12s***
- If the result is cached than it will say <em>" cacheResult " : " using cached data 😎 "</em>
