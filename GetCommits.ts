function makeRequest(username: string, token: string) {
    return new Promise(function (resolve, reject) {
        var maxCommits = "60";
        var order = "desc";
        var sort = "committer-date";
        var requestString = "https://api.github.com/search/commits?q=committer:" + username + "&sort=" + sort + "&order=" + order + "&per_page=" + maxCommits;
        let xhr = new XMLHttpRequest();
        xhr.open('get', requestString);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

async function getUserCommits(username: string, token: string){
    try {
        var dateCollection = [];
        var remoteCode = await makeRequest(username, token);
        const data = JSON.parse(remoteCode);
        var count = 0;
        var oldTime = 0;
        var sum = 0;

        data.items.forEach(item => {
          var commitTime = item.commit.committer.date
          if(count == 0)
          {
            oldTime = new Date(commitTime).getTime();
          }
          else
          {
            var newTime = new Date(commitTime).getTime();
            sum = sum + (oldTime - newTime);
            oldTime = newTime;
          }
          dateCollection.push(commitTime);
          count++;
        });
        
        if(count > 1)
        {
          sum = sum / 3600000; // this is number of millisecond in an hour
          console.log("Mean time between commits is = " + (sum/(count-1)).toFixed(2) + "hours");
        }
        writeToCSV(dateCollection);
      
      } catch(error) {
        console.log("Error fetching: ", error);
    }              
}

function writeToCSV(dateCollection: any) {
        var csvDates = dateCollection.toString()
        var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvDates], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'UserCommits.csv';
        a.click();
}

var username = "fakeuser"; // this is a fake name
var token = "ghp_HNDA2SR7hUg2JL0ro1CG8ozYe0sEnH1fIuMv"; // this is fake token
getUserCommits(username, token);


