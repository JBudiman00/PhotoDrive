# PhotoDrive
Google PhotoDrive abilities without requiring a google email or storing information on the google cloud. 
This project is composed of three main parts:
1. People should be able to create an account and login to their drive.
2. The drive will be a place where people can store and upload photos to a local server host cloud using a Raspberry Pi.
3. Users can create 'Albums', store iamges and give viewing priviledges to other specific users 

In addition, Albums should be able to be displayed in the frontend as a slideshow presentation (User-requested feature)

ERD Schema:<br>
![image](https://github.com/JBudiman00/PhotoDrive/assets/65978976/aa122dbc-40f7-4379-9251-b908e2e60839)
The image above shows the database schema planned for this project. It is designed using draw.io.<br>
The Users table will have a unique user_id identifer, with email being the unique part of the table for user login.<br>
The password will be stored using a hash function to improve system security.<br>
The photos table has a single unique int identifer. It also stores the photo as a varbinary, the datetime uploaded, image name and the user_id the photo belongs to.<br>
The albums table has a single unique int identifer. It also stores the datetime of album creation, the album name and the user_id the album belongs to.<br>
THe photoalbum table is a join table for the many:many relationship between photos and albums. It consists of the foreign keys from the img_id and album_id.<br>
The useralbums table is another join table for the many:many relationship between users and albums. It consists of the foreigns keys from the img_id and user_id, where the user_id represents the users allowed to view an album not owned by the user. <br>
