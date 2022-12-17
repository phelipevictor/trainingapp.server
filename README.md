# Training-server

Third project for ironhack, it is a training app, backend.

## Models Schema

- Exercise
. "name", "muscularGroup", "type", "description", "imageUrl", "youtubeUrl"

- ExerciseTraining
. "exerciseId", "type", "trainingId"

- Training
. "name", "group", "description", "exercises", "type", "level"

- User
. "username", "email", "password"

### Routes

| Method 	| Endpoint                     	| Payload                                                   	| Response                    	| Action                             	|
|--------	|------------------------------	|-----------------------------------------------------------	|-----------------------------	|------------------------------------	|
| Post   	| /signup                      	| {"username": String, "email":String, "password": String}  	| /login                      	| Register a new User with token     	|
| Post   	| /login                       	| {"email":String, "password": String}                      	| /exercises                  	| Validate the existance of the user 	|
| Post   	| /exercise                    	| {"name": String, "muscularGroup":String, "type": String}  	| /exercise                   	| Create a new exercise              	|
| Post   	| /training                    	| {"name": String, "group": String, "description": String}  	| /training                   	| Create a new training              	|
| Get    	| /training                    	| {"name": String, "group": String, "description": String}  	| /training                   	| Get all trainings                  	|
| Get    	| /training/:trainingId        	| {"name": String, "group": String, "exerciseId"= String}   	| /training/:trainingId       	| Get one training                   	|
| Get    	| /exercise                    	| {"muscularGroup": String, "name": String, "type": String} 	| /exercise                   	| Get all exercises                  	|
| Get    	| /exercise/:exerciseId        	| {"name": String, "muscularGroup":String, "type": String}  	| /exercise/:exerciseId       	| Get one exercise                   	|
| Get    	| /exercise/bymusculargroup/?  	| {"name": String, "muscularGroup":String, "type": String}  	| /exercise/bymuscularGroup/? 	| Get exercise by MuscularGroup      	|
| Put    	| /training/:trainingId/edit   	| {"name": String, "group": String, "description": String}  	| /:trainingId                	| Update one training                	|
| Put    	| /exercise/:exerciseId/edit   	| {"name": String, "muscularGroup":String, "type": String}  	| /:exerciseId                	| Update one exercise                	|
| Delete 	| /training/:trainingId/delete 	| /-                                                        	| /-                          	| Delete one training                	|
| Delete 	| /exercise/:exerciseId/delete 	| /-                                                        	| /-                          	| Delete one exercis                 	|

### Status

Completed

### Credits

. Phelipe Victor