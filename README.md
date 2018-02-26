# saysomethingnice.com
Simple website to send nice messages to strangers using bootstrap, node, and express.

I haven't decided whether to filter out negative messages and scold users for inputting them, or expect negative messages and sarcastically thank users for sending them.
not sure what's funnier...


This version uses MongoDB to store the messages. Initially I wasn't going to use a database. I was planning on just storing the most current message in memory, and I think that's the most lightweight way to do this (not including power costs). But, I wanted to deploy it to heroku, and because free heroku dynos cycle every day, I needed something for message persistence.
(tldr - this branch uses MongoDB so I can have message persistence on my free heroku deployment)
