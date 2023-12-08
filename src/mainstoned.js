document
    .getElementById("enterButton")
    .addEventListener("click", function () {
        document.getElementById("clickHere").classList.add("hidden");
        document.getElementById("content").classList.remove("hidden");
        document.getElementById("username").classList.remove("hidden");
        document.getElementById("bgAudio").play();
        document.getElementById("bgVid").play();
    });

document
document.getElementById("clickHere").addEventListener("click", function () {
    document.getElementById("clickHere").classList.add("hidden");
    document.getElementById("bgVid").addEventListener("loadeddata", function () {
        document.getElementById("bgAudio").play();

        document.getElementById("bgVid").play();
        document.getElementById("bgVid").currentTime = 20;
        document.getElementById("bgAudio").currentTime = 20;
    });
    document.getElementById("bgVid").load();
});





let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isLineVisible = true;
function typeWithLRC(lrcContent, typewriterElement) {
    const lrcLines = parseLRC(lrcContent);
    typeLRCLines(lrcLines, typewriterElement, 0, 0, false, false);
}

function parseLRCLines(lrcContent) {
    const lines = lrcContent.split('\n');
    const lrcLines = [];

    for (const line of lines) {
        const matches = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
        if (matches) {
            const minutes = parseInt(matches[1]);
            const seconds = parseFloat(matches[2]);
            const timestamp = minutes * 60 + seconds;
            const text = matches[3].trim();
            lrcLines.push({ timestamp, text });
        }
    }

    return lrcLines;
}

function parseLRC(lrcText) {
    const lines = lrcText.split('\n');
    const lrcLines = [];

    for (let line of lines) {
        const match = line.match(/^\[(\d{2}):(\d{2})\.(\d{2})\]([^[\]]*)$/);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const milliseconds = parseInt(match[3]);
            const text = match[4].trim();

            const timestamp = (minutes * 60 + seconds) * 1000 + milliseconds;
            lrcLines.push({ timestamp, text });
        }
    }

    return lrcLines;
}

function typeLRCLines(lrcLines, typewriterElement, audioElement, lineIndex, charIndex, isDeleting, isLineVisible) {
    const currentLine = lrcLines[lineIndex];
    const nextLineIndex = (lineIndex + 1) % lrcLines.length;
    const nextLine = lrcLines[nextLineIndex];
    const currentTimestamp = currentLine.timestamp;

    const currentTime = audioElement.currentTime;

    // Create the typewriter effect with the visible text and line
    const visibleText = currentLine.text.substring(0, charIndex);
    const typewriterText = `${visibleText}${isLineVisible ? '|' : ''}`;
    typewriterElement.textContent = typewriterText;

    // Adjust the charIndex and isDeleting flags
    if (isDeleting) {
        charIndex = currentLine.text.length; // Jump to the end of the line
        isDeleting = false; // Reset deleting flag
    } else {
        charIndex++;
    }

    // Check if the typing is completed or deleted
    if (charIndex > currentLine.text.length) {
        isLineVisible = false; // Hide the line immediately

        // Check if the audio has reached the next line's timestamp
        if (currentTime >= nextLine.timestamp) {
            charIndex = 0; // Reset charIndex to 0 for the next line
            isLineVisible = true; // Set line visibility to true for the next line

            typeLRCLines(lrcLines, typewriterElement, audioElement, nextLineIndex, charIndex, isDeleting, isLineVisible);
        } else {
            // Recursive call with setTimeout to continue checking for audio timestamp
            setTimeout(() => typeLRCLines(lrcLines, typewriterElement, audioElement, lineIndex, charIndex, isDeleting, isLineVisible), 20);
        }
    } else {
        // Recursive call with setTimeout for typing
        const timeoutDuration = isLineVisible ? 35 : 0; // Adjust the timing for optimal speed
        setTimeout(() => typeLRCLines(lrcLines, typewriterElement, audioElement, lineIndex, charIndex, isDeleting, isLineVisible), timeoutDuration);
    }
}








// Function to update the title with a typewriter effect
function updateTitle(title) {
    let index = 0;
    let isDeleting = false;

    // Interval to update the title every 200 milliseconds
    const interval = setInterval(() => {
        // Build the title progressively
        if (!isDeleting) {
            const partialTitle = title.substring(0, index + 1);
            document.title = partialTitle;
            index++;

            // Start backspacing when the title is complete
            if (index === title.length) {
                isDeleting = true;
                index--;
            }
        } else {
            const partialTitle = title.substring(0, index);
            document.title = partialTitle;
            index--;

            // Restart typing when backspacing is complete
            if (index === 0) {
                isDeleting = false;
            }
        }
    }, 250);
}




function AntiSkid(debug) {
    if (debug) {
        return;
    }
    // Get the root URL
    var rootURL = window.location.protocol + '//' + window.location.host;

    // Define the desired root URL
    var desiredRootURL = 'https://killing.fun';

    // Check if the current URL is the desired root URL
    if (rootURL !== desiredRootURL) {
        // Redirect to a different site
        window.location.href = 'https://killing.fun';
    }

}
AntiSkid(true);



