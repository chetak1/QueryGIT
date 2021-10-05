

Language used
- TypeScript

How to run?
- Go to https://www.typescriptlang.org/play and copy the code over from GetCommits.ts and hit run. This should print to console the meantime between commits (if number of commits is greater than 1). Also this should also write out all the commit times of the user in a csv file that will be downloaded directly. See download path of the browser download.
- Please add the username and token at the bottom of the file (line 81 and 82) as input for getUserCommits function

Platform
- This should be platform agnostic, but I only have a windows machine and used Chrome browser. Please see the csv file in the download section of the browser

Assumption - I used committer for the user instead of author. It is possible that user != author. See the difference here: https://stackoverflow.com/questions/6755824/what-is-the-difference-between-author-and-committer-in-git?lq=1
  