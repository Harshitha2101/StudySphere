document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.querySelector("aside");
    const profileBtn = document.querySelector("#profile-btn");
    const themeToggler = document.querySelector(".theme-toggler");
    const nextDay = document.getElementById('nextDay');
    const prevDay = document.getElementById('prevDay');

    // Profile button toggle for side menu
    profileBtn.onclick = function() {
        sideMenu.classList.toggle('active');
    }

    // Scroll event to remove side menu and add/remove header active class
    window.onscroll = () => {
        sideMenu.classList.remove('active');
        if(window.scrollY > 0) {
            document.querySelector('header').classList.add('active');
        } else {
            document.querySelector('header').classList.remove('active');
        }
    }

    // Theme toggle function
    const applySavedTheme = () => {
        const isDarkMode = localStorage.getItem('dark-theme') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.add('active');
            themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
        } else {
            document.body.classList.remove('dark-theme');
            themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
            themeToggler.querySelector('span:nth-child(2)').classList.add('active');
        }
    }

    // Set the initial theme based on localStorage
    applySavedTheme();

    // Toggle theme function
    themeToggler.onclick = function() {
        // Toggle dark theme class on body
        document.body.classList.toggle('dark-theme');
        
        // Toggle active class on the theme toggler spans
        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
        
        // Save the theme preference in localStorage
        localStorage.setItem('dark-theme', document.body.classList.contains('dark-theme'));
    }

    // Function to set timetable data
    let setData = (day) => {
        document.getElementById('schedule-container').innerHTML = '';  // Clear previous table data
        let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        document.querySelector('.timetable div h2').innerHTML = daylist[day];
        
        // Define subjects for each day (you might need to update this with real data)
        let daySchedule = [];
        switch(day) {
            case 0: daySchedule = Sunday; break;
            case 1: daySchedule = Monday; break;
            case 2: daySchedule = Tuesday; break;
            case 3: daySchedule = Wednesday; break;
            case 4: daySchedule = Thursday; break;
            case 5: daySchedule = Friday; break;
            case 6: daySchedule = Saturday; break;
        }

        // Append timetable data to table
        daySchedule.forEach(sub => {
            const card = document.createElement('div');
            card.classList.add('schedule-card');
            card.innerHTML = `
                <div class="time">
                    ${sub.time}
                </div>
                <div class="details">
                    <h3>${sub.subject}</h3>
                    <p>
                        ${sub.roomNumber} • ${sub.type}
                    </p>
                </div>
            `;
            document
                .getElementById('schedule-container')
                .appendChild(card);
        });
    }    

    // Get current day and set timetable on page load
    let now = new Date();
    let today = now.getDay();  // Get current day (0 - 6)
    let day = today;  // To prevent today value from changing

    // Function to toggle timetable visibility
    function timeTableAll(){
        document.getElementById('timetable').classList.toggle('active');
        setData(today);
        document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
    }

    // Event listeners for next and previous day buttons
    nextDay.onclick = function() {
        day <= 5 ? day++ : day = 0;  // If-else one-liner
        setData(day);
    }

    prevDay.onclick = function() {
        day >= 1 ? day-- : day = 6;  // Move to previous day
        setData(day);
    }

    // Set data on page load
    setData(day);  
    document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";  // Set heading on load
});
