# LockerRoom - You'll never play alone

LockerRoom is a user-friendly mobile application designed to bring football enthusiasts together and streamline the process of organizing and participating in friendly football games. Whether you're a seasoned player or someone looking to kick the ball around for fun, LockerRoom is your go-to platform for creating, joining, and managing football games with friends.

The server is hosted in render: https://lockerroom.onrender.com (Render is a free service and it turns non active projects in "sleeping mode"). Once you click in the link above, you should wait and it will only take a minute for the server to wake up!

The frontend user interface is hosted in vercel: https://juan-garcia-final-project-front-202304-mad.vercel.app/

URL to github backend repository: https://github.com/juan-gsan/locker-room-back

The frontend is built using Angular and TypeScript. The project handles users and football games, giving the user a responsive web interface for mobile and desktop.

Fully tested (100% coverage) with Jasmine.

## Installation

- Clone this repository
- Install dependencies with `npm install`
- Start the app with `ng serve`. Make sure you have started the server to make the http requests work. Navigate to `http://localhost:4200/`

## Main Features

### Register

There is no game if you are not logged in. First of all, create an account and log into the app with your credentials. If you are not logged, you will be able to see the games and navigate through them, but you will not interact with games and other users.

### Create Games

With LockerRoom, you have the power to create your very own football games. As the game creator, you'll be able to set the date, time, location, and other relevant details for the match. This feature ensures that you have full control over the games you organize, allowing you to tailor the experience to your preferences.

### Edit and Delete Owned Games

As the owner of a game, you're not locked into your initial choices. Need to change the game time? Update the location? No problem. LockerRoom lets you easily edit the details of games you own, ensuring that your fellow players are always up to date. And if plans change or you need to cancel, you can also delete the game altogether.

### Join Games

Looking for a game to join? LockerRoom's intuitive interface displays a list of upcoming games created by other users. You can browse through these games, review their details, and choose the ones that best fit your schedule and playing preferences. This feature ensures that you'll never have to search too hard for a game to be a part of.

### Leave Games

Life can get busy, and sometimes you might need to back out of a game you initially joined. LockerRoom understands this, and it's easy to leave a game you can no longer commit to. By doing so, you're helping the game's organizer get an accurate headcount and ensuring a smoother experience for everyone involved.

### Filter by type

You can filter games by type, football-11, football-7 or football-5. So you don't have to worry about a mistaken choice. You'll know all the time that you are playing the game you want to.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
