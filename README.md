# RESTful Routing

## REST
* (RE)presentational (S)tate (T)ransfer
* A mapping between HTTP routes and CRUD

## CRUD
* CREATE  =>  /addBlog
* READ    =>  /allBlogs
* UPDATE  =>  /updateBlog/:id
* DESTROY =>  /destroyBlog/:id

## RESTful ROUTES
A table of all 7 RESTful Routes

|Name    |Path            |HTTP verb  |Purpose                                           |Mongoose Expression                        |
|--------|----------------|-----------|--------------------------------------------------|-------------------------------------------|
|Index   |/blogs          |GET        |List all blogs                                    |Blog.find(callback)                        |
|New     |/blogs/new      |GET        |Show new blog form                                |N/A                                        |
|Create  |/blogs          |POST       |Create a new blog then redirect somewhere         |Blog.create(callback)                      |
|Show    |/blogs/:id      |GET        |Show info about one specific blog                 |Blog.findById(id, callback)                |
|Edit    |/blogs/:id/edit |GET        |Show edit form for one blog                       |Blog.findById(id, callback)                |
|Update  |/blogs/:id      |PUT        |Update a particular blog, then redirect somewhere |Blog.findByIdAndUpdate(id, data, callback) |
|Destroy |/blogs/:id      |DELETE     |Delete a particular blog, then redirect somewhere |Blog.findByIdAndRemove(id, callback)       |
