# Training-server

Third project for ironhack, it is a training app, backend.

## Models

- Exercise
- ExerciseTraining
- Training
- User

### Routes

| Method 	| Endpoint                     	| Payload                                                                                                         Response                    	| Action                             	|
|--------	|------------------------------	|-------------------------------------------------------------------------------------------------------------------------------	|-----------------------------	|------------------------------------	|
| Post   	| /signup                      	| {"username": String, "email":String, "password": String}                                                                      	| /login                      	| Register a new User with token     	|
| Post   	| /login                       	| {"email":String, "password": String}                                                                                          	| /exercises                  	| Validate the existance of the user 	|
| Post   	| /exercise                    	| {"name": String, "muscularGroup":String, "type": String, "description": String, "imageUrl": String, "youtubeUrl": String}     	| /exercise                   	| Create a new exercise              	|
| Post   	| /training                    	| {"name": String, "group": String, "description": String, "exercises": ref:'ExerciseTraining'; "type": String, "level":String} 	| /training                   	| Create a new training              	|
| Get    	| /training                    	| {"name": String, "group": String, "description": String, "level": String}                                                     	| /training                   	| Get all trainings                  	|
| Get    	| /training/:trainingId        	| {"name": String, "group": String, "exerciseId"= String, "description": String, "imageUrl": String, "youtubeUrl": String}      	| /training/:trainingId       	| Get one training                   	|
| Get    	| /exercise                    	| {"muscularGroup": String, "name": String, "type": String, "description": String, "imageUrl": String, "youtubeUrl": String}    	| /exercise                   	| Get all exercises                  	|
| Get    	| /exercise/:exerciseId        	| {"name": String, "muscularGroup":String, "type": String, "description": String, "imageUrl": String, "youtubeUrl": String}     	| /exercise/:exerciseId       	| Get one exercise                   	|
| Get    	| /exercise/bymusculargroup/?  	| {"name": String, "muscularGroup":String, "type": String, "description": String, "imageUrl": String, "youtubeUrl": String}     	| /exercise/bymuscularGroup/? 	| Get exercise by MuscularGroup      	|
| Put    	| /training/:trainingId/edit   	| {"name": String, "group": String, "description": String, "exercises": ref:'ExerciseTraining'; "type": String, "level":String} 	| /:trainingId                	| Update one training                	|
| Put    	| /exercise/:exerciseId/edit   	| {"name": String, "muscularGroup":String, "type": String, "description": String, "imageUrl": String, "youtubeUrl": String}     	| /:exerciseId                	| Update one exercise                	|
| Delete 	| /training/:trainingId/delete 	| /-                                                                                                                            	| /-                          	| Delete one training                	|
| Delete 	| /exercise/:exerciseId/delete 	| /-                                                                                                                            	| /-                          	| Delete one exercis                 	|


### Status

Completed

### Credits

. Phelipe Victor