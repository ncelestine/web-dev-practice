// Run all jQuery code only after the page is fully loaded
$(document).ready(function () {
  console.log("Page is ready.");

  // Updates the guest counter based on how many guests are in the list
  function updateGuestCount() {
    const count = $("#guestList li").length;
    $("#guestCount").text(count);
  }

  // Updates meal totals by checking the meal saved on each <li>
  function updateMealCounts() {
    let chicken = 0;
    let fish = 0;
    let veg = 0;

    $("#guestList li").each(function () {
      const meal = $(this).data("meal");

      if (meal === "Chicken") chicken++;
      if (meal === "Fish") fish++;
      if (meal === "Vegetarian") veg++;
    });

    $("#chickenCount").text(chicken);
    $("#fishCount").text(fish);
    $("#vegCount").text(veg);
  }

  // Loads the announcement text file and puts it on the page
  function loadAnnouncement() {
    $("#announcementBox").text("Loading announcement...");

    $.get("announcement.txt")
      .done(function (data) {
        $("#announcementBox").text(data);
      })
      .fail(function () {
        $("#announcementBox").text("Could not load announcement.txt");
      });
  }

  // Live preview while typing a name
  $("#guestName").on("keyup", function () {
    const typedName = $("#guestName").val().trim();

    if (typedName === "") {
      $("#preview").text("");
    } else {
      $("#preview").text("Registering: " + typedName);
    }
  });

  // When the Register button is clicked
  $("#registerBtn").on("click", function () {
    const name = $("#guestName").val().trim();
    const meal = $("#mealChoice").val();

    // Validation: don't allow empty names
    if (name === "") {
  alert("Please enter a guest name.");
  return;
}

    // Check duplicates by comparing just the name part (before the dash)
    let duplicateFound = false;

    $("#guestList li").each(function () {
      const existingText = $(this).text();
      const existingName = existingText.split("—")[0].trim();

      if (existingName.toLowerCase() === name.toLowerCase()) {
        duplicateFound = true;
      }
    });

    if (duplicateFound) {
  alert("Guest already registered!");
  return;
}

    // Build the new list item
    const newGuestItem = $(
      "<li>" +
        name + " — " + meal +
        " <button class='removeBtn'>Remove</button>" +
      "</li>"
    );

    // Save the meal choice on the <li> so we can count meals later
    newGuestItem.data("meal", meal);

    // Add it to the guest list
    $("#guestList").append(newGuestItem);

    // Flash the background color quickly to show a successful add
    $("body").css("background-color", "#fff3b0"); // light yellow
    setTimeout(function () {
      $("body").css("background-color", "white");
    }, 300);

    // Highlight the new guest for a moment so it's easy to see
    newGuestItem.css("background-color", "#c8f7c5"); // light green
    setTimeout(function () {
      newGuestItem.css("background-color", "transparent");
    }, 600);

    // Update status message
    $("#statusMsg").text(name + " has been successfully registered.");

    // Clear the input box after adding
    $("#guestName").val("");
    $("#preview").text("");

    // Update the counters after adding a guest
    updateGuestCount();
    updateMealCounts();
  });

  // Load announcement only when button is clicked
$("#loadAnnouncementBtn").on("click", function () {
  loadAnnouncement();
});

  // Remove guest when Remove button is clicked
  $("#guestList").on("click", ".removeBtn", function () {
    // Remove the whole <li> that contains this button
    $(this).parent().remove();

    // Update the counters after removing
    updateGuestCount();
    updateMealCounts();
  });

  // Change guest name color on hover
  $("#guestList").on("mouseenter", "li", function () {
    $(this).css("color", "pink");
  });

  $("#guestList").on("mouseleave", "li", function () {
    $(this).css("color", "black");
  });

  // Run these once when the page first loads
  updateGuestCount();
  updateMealCounts();
  
});