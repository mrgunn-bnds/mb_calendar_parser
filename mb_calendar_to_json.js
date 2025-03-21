// Function to convert extracted schedule data to JSON format
function toJSON(data) {
    return JSON.stringify(data, null, 2); // Pretty-print with indentation
}

// Extract class schedule structured by period numbers and weekdays
function extractSchedule() {
    const schedule = {}; // Store schedule by weekdays
    const tableRows = document.querySelectorAll('table tbody tr'); // Adjust selector if needed

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; // Define weekdays

    tableRows.forEach((row, index) => {
        const columns = row.querySelectorAll('td'); // Get all table cells in the row

        if (columns.length > 1) {

            // Iterate through weekdays (starting from the second column)
            weekdays.forEach((day, dayIndex) => {
                if (!schedule[day]) {
                    schedule[day] = [];
                }

                const classCell = columns[dayIndex + 1]; // Monday is in the second column

                if (classCell) {
                    const className = classCell.querySelector('.class-name a')?.textContent.trim() || 'Unknown';
                    const classGrade = classCell.querySelector('.class-grade')?.textContent.trim() || 'Unknown';
                    const classTime = classCell.querySelector('.text-ellipsis:last-child')?.textContent.trim() || 'Unknown';
                    const periodNumber = columns[0].textContent.trim(); // First column is period number

                    // Only add to schedule if className is not empty
                    if (className && className !== 'Unknown') {
                        schedule[day].push({
                            Period: periodNumber,
                            Class: className,
                            Grade: classGrade,
                            Time: classTime
                        });
                    }
                }
            });
        }
    });

    return schedule;
}

// Function to save JSON to a file
function downloadJSON(data, filename = "managebac_schedule.json") {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Get the structured schedule data
const classData = extractSchedule();

// Download the JSON file
downloadJSON(classData);

// Convert to JSON
const jsonData = toJSON(classData);

// Output JSON to console
console.log(jsonData);