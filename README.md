# H04 JavaScript: Quiz

This is a calendar application that allows the user to save events for each work-hour of the day. This app will run in the browser, feature dynamically updated HTML and CSS powered by jQuery and feature the use of localStorage.

## GettingStarted

Where is the project?

>[github repository](https://github.com/crisdc88/H5-WD-SCHEDULER)

## Prerequisites

>N/A

## Built With

* HTML
* CSS
* jQuery

## Deployed Link

>[deployed URL: https://crisdc88.github.io/H5-WD-SCHEDULER/](https://crisdc88.github.io/H5-WD-SCHEDULER/)

## Code-Snippets

1. Open scheduler.js
2. Find the following code showing the use the creation of elements dynamically.
3. use of setInterval.

```

Eventhough JavaScript do not have HashMaps, I used key object to function as a hash, so that retrieven and copying data to the local storage would be O(1) access time.

In this case Index will be each hour of the calendar.

 if (scheduleObject === null) {
            scheduleObject = { [index]: enteredText };

        } else {
            scheduleObject[index] = enteredText;
        }



A set interval will be running every second, and the page will get refresh only when there's a change of hour, that way I garantee that the background colors are always displayed correctly.

      myInterval = setInterval(function () {
            currentHour = moment().hour();

            if (currentHour > pastHour) {
                location.reload();
            }
            pastHour = currentHour;

        }, 1000)

Because of the way I desing the creation of the elements, just by doing the following I was able to change the background colors.

            if (currentHour < j) {
                $(col2textarea).addClass("past");
            }
            if (currentHour === j) {
                $(col2textarea).addClass("present");
            }
            if (currentHour > j) {
                (col2textarea).addClass("present");

            }


```

## Author

D. Cristina Terry.
GitHub: [https://github.com/crisdc88/](https://github.com/crisdc88/),

LinkedIn: [www.linkedin.com/in/dcristinaterry](www.linkedin.com/in/dcristinaterry)

## License

[MIT](https://choosealicense.com/licenses/mit/)