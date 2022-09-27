### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
	* You can run async functions via setTimeout
	* You can also run actual <i>keyword</i> async functions in combination with AJAX

- What is a Promise?
	* A promise is a one-time guarantee of value.
	* In other words, it's an object (in Javascript), that can be pending, resolved, or rejected based on the value it has (or has not) received.

- What are the differences between an async function and a regular function?
	* An async function does not run "in order" or "top to bottom" but instead is dependent on some callback returning after the rest of the code has run.

- What is the difference between Node.js and Express.js?
	* Node is a runtime environment for executing JS code outside of a browser (not a framework nor a programming language)
	* Express is a small <i>framework</i> that sits on top of Node to simplify APIs and makes things easier to organize with middleware and routing.

- What is the error-first callback pattern?
	* Typically a try/catch will be used in the callback to ensure errors are caught and don't crash or end the code
	* Ex:

```js app.get("/users/:username", function(req, res, next){
  try {
    const user = USERS.find(u => u.username === req.params.username);
    if (!user) throw new ExpressError("Not found!", 404);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
})
```
- What is middleware?
	* Middleware is code that runs in the middle of the request/response cycle.
	* express.json() is an example of middleware in Express
	* Additionally, many errors are handled by use of middleware

- What does the `next` function do?
	* next() allows middleware to know to move to the next route.
	* Without next(), the code will not continue to run to the next corresponding route.
	* With errors, an argument (any character(s)) are passed in which indicates to Express that the next route should be the error route.

- What are some issues with the following code? (consider all aspects: performance, structure, 
naming, etc)

	* First of all, the duplication could be reduced by setting a variable of baseURL
	* Additionally, we are waiting for each request to finish before starting the next
	* Better to use Promise.all() to await all of them at once and allow the array to resolve before returning.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```


