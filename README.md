
# Minimal reproducible example for [this issue](https://github.com/kleydon/prisma-session-store/issues/88)

## Description

 The problem seems to be caused by concurrent updates to the exact same record. This is
 very likely to happen when the user loads the initial HTML page, which contains assets
 whch are requested in parallel.

 If those asset requests also "touch" the session, then multiple writes are attempted.

 One workaround is to move the assets serving code right before sessions are are accessed.

 Given parallel request involving the same session can still happen for other reasons, another
 thing to do is to not include the optional "touch" method in the session store, and
 also disabling the "resave" option for express-ession.

 These are all workarounds in my opinion, as at the end of the day there's some bug
 or limitation in either Prisma or SQLite which causes the root problem. I've not
 digged in enough into that to understand the low level details of that.

## Running the example

1. Run `npm install`
2. Run `npx prisma migrate`
3. Run `npm start`
4. Load the HTML at [http://localhost:3000](http://localhost:3000)
5. Repeatedly run CMD+R to reload the page, observe the errors in the terminal where the application is running
6. Follow the comments in the code to try out the mentioned workarounds
