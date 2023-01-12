# assignment
## Limitations

* Restaurants are created when menu addition api is called.
* A single api is used to create and update restaurant menu, because the ‘findOneAndUpdate’ of mongoose is used which adds a document if it does not exist and updates it if its exists. Could’ve used separate api’s but would violate the DRY principle 
* User can add only one review for a food item of a restaurant. If more than one reviews are added upon update review, only one will be updated. ( can be solved using unique id )
* If two restaurants have the same rating, it will return the first one it encounters based on order in top-restaurant api.
* Currently the user has to remember the name of food and restaurants, if UI is developed for this the user can be provided with a drop down of restaurant names (fetched from backend ), if clicked on a restaurant, menu of that restaurant can be displayed, from which user can select a food and give ratings/reviews. This will also improve the searching mechanism and make it less prone to errors as currently the user has to enter the exact name of food and restaurant. 

