// =============================================================
// Juniper & Grain: send the Menu tab as JSON
// Google runs doGet() every time someone visits this script's
// web address, and sends back whatever it returns.
// =============================================================

function doGet() {
  // Get every row of the Menu tab as an array of rows.
  const sheet = SpreadsheetApp.getActive().getSheetByName("Menu");
  const rows = sheet.getDataRange().getValues();

  // Row 1 (index 0) holds the keys: category, name, description...
  const keys = rows[0];

  let menu = [];

  // Start at index 1 to skip the key row.
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];

    // Skip a row with no name.
    if (row[1] === "") {
      continue;
    }

    // Turn the row into an object: { category: "Coffee", name: "Cold Brew", ... }
    let item = {};
    for (let k = 0; k < keys.length; k++) {
      item[keys[k]] = row[k];
    }

    // Turn "vegan, gluten-free" into ["vegan", "gluten-free"].
    if (item.tags === "") {
      item.tags = [];
    } else {
      item.tags = item.tags.split(", ");
    }

    menu.push(item);
  }

  // Send the array back as JSON.
  const output = ContentService.createTextOutput(JSON.stringify(menu));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
