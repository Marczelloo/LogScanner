function searchFile() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const lines = fileContent.split('\n');
      const result = [];
      const ipCounts = {};
  
      lines.forEach(line => {
        const match = line.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
        if (match) {
          const ip = match[1];
  
          if (line.includes('"GET /opony-do-samochodu/')) {
            result.push(ip);
  
            console.log(line);
            let isGoogleCrawler = false; // Initialize isGoogleCrawler as false
  
            if (line.includes('google') || line.includes('Google') || line.includes('AdsBot-Google')) { // Check if the line includes 'googl' or 'Google'
              isGoogleCrawler = true; // Set isGoogleCrawler to true
            }
  
            console.log(isGoogleCrawler);
  
            if (!ipCounts[ip]) {
              ipCounts[ip] = {
                count: 1,
                isGoogleCrawler: isGoogleCrawler
              };
              console.log(isGoogleCrawler);
            } else {
              ipCounts[ip].count++;
              ipCounts[ip].isGoogleCrawler = isGoogleCrawler;
              console.log(isGoogleCrawler);
            }
          }
        }
      });
  
      // Display the results
      const searchResults = document.getElementById('log-output');
      searchResults.innerHTML = null;
      const table = document.createElement('table');
      const header = document.createElement('tr');
      const h1 = document.createElement('th');
      h1.innerHTML = 'IP';
      const h2 = document.createElement('th');
      h2.innerHTML = 'COUNT';
      const h3 = document.createElement('th');
      h3.innerHTML = 'IS GOOGLE CRAWLER'

      header.append(h1, h2, h3);

      const heading = document.createElement('h1');
      heading.innerHTML = "RESULTS";
      searchResults.appendChild(heading);
      table.appendChild(header)
      searchResults.appendChild(table);
      
      Object.entries(ipCounts).forEach(([ip, info]) => {
        const resultEntry = document.createElement('tr');
        const c1 = document.createElement('td');
        c1.innerHTML = `${ip.trim()}`
        const c2 = document.createElement('td');
        c2.innerHTML = `${info.count}`
        const c3 = document.createElement('td');
        c3.innerHTML = `${info.isGoogleCrawler}`;
        resultEntry.append(c1, c2, c3);
        table.appendChild(resultEntry);
        // resultEntry.innerHTML = `${ip}, Occurrences: ${info.count}, Google Crawler: ${info.isGoogleCrawler === true ? 'Yes' : 'No'}`;
        // searchResults.appendChild(resultEntry);
      });
    };
  
    reader.readAsText(file);
  }
  