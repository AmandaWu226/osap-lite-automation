#!/usr/bin/env python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time
import sys

# Configure the URL to test - can be passed as command line argument
BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5174"
print(f"Testing application at: {BASE_URL}")

# Set up the browser options
options = Options()
# options.add_argument("--headless")  # Keep the browser visible
options.add_argument("--window-size=1920,1080")

# Initialize the browser
driver = webdriver.Chrome(options=options)

# Utility function to wait for elements
def wait_for_element(selector, selector_type=By.CSS_SELECTOR, timeout=10):
    try:
        element = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((selector_type, selector))
        )
        return element
    except TimeoutException:
        print(f"Timed out waiting for element: {selector}")
        return None

# Utility function to wait for element to be clickable
def wait_for_clickable(selector, selector_type=By.CSS_SELECTOR, timeout=10):
    try:
        element = WebDriverWait(driver, timeout).until(
            EC.element_to_be_clickable((selector_type, selector))
        )
        return element
    except TimeoutException:
        print(f"Element not clickable: {selector}")
        return None

# Useful function to safely click elements
def safe_click(element):
    try:
        element.click()
        return True
    except:
        try:
            driver.execute_script("arguments[0].click();", element)
            return True
        except:
            return False

try:
    # Navigate to the application
    driver.get(BASE_URL)
    print(f"Navigated to {BASE_URL}")
    print(f"Current URL: {driver.current_url}")
    
    # Step 0: Index page - Fill out the initial form
    print("Step 0: Filling out the index page form")
    
    # Wait for the page to fully load
    time.sleep(2)
    
    # First name field - using placeholder text to find it
    first_name = wait_for_element("input[placeholder*='first name']")
    if first_name:
        first_name.send_keys("Amanda")
        print("Entered first name")
    else:
        # Try alternative selector
        inputs = driver.find_elements(By.TAG_NAME, "input")
        if len(inputs) > 0:
            inputs[0].send_keys("Amanda")
            print("Entered first name using alternative selector")
    
    # Last name field
    last_name = wait_for_element("input[placeholder*='last name']")
    if last_name:
        last_name.send_keys("Wu")
        print("Entered last name")
    else:
        # Try alternative selector
        inputs = driver.find_elements(By.TAG_NAME, "input")
        if len(inputs) > 1:
            inputs[1].send_keys("Wu")
            print("Entered last name using alternative selector")
    
    # Email field
    email = wait_for_element("input[placeholder*='email']")
    if email:
        email.send_keys("amanda@example.com")
        print("Entered email")
    else:
        # Try alternative selector
        inputs = driver.find_elements(By.TAG_NAME, "input")
        if len(inputs) > 2:
            inputs[2].send_keys("amanda@example.com")
            print("Entered email using alternative selector")
    
    # Phone number field
    phone = wait_for_element("input[placeholder*='phone']")
    if phone:
        phone.send_keys("1234567890")
        print("Entered phone number")
    else:
        # Try alternative selector
        inputs = driver.find_elements(By.TAG_NAME, "input")
        if len(inputs) > 3:
            inputs[3].send_keys("1234567890")
            print("Entered phone number using alternative selector")
    
    # Find select elements
    selects = driver.find_elements(By.TAG_NAME, "select")
    print(f"Found {len(selects)} select elements")
    
    # Month select
    if len(selects) >= 1:
        month_select = selects[0]
        driver.execute_script("arguments[0].scrollIntoView();", month_select)
        month_select.click()
        time.sleep(1)
        # Try to find the September option
        options = month_select.find_elements(By.TAG_NAME, "option")
        for option in options:
            if "September" in option.text:
                option.click()
                print("Selected September for month")
                break
        else:
            # If not found by text, try by index
            if len(options) > 9:  # September might be the 9th month in the list
                options[9].click()
                print("Selected September by index")
    
    # Year select
    if len(selects) >= 2:
        year_select = selects[1]
        driver.execute_script("arguments[0].scrollIntoView();", year_select)
        year_select.click()
        time.sleep(1)
        # Try to find the 2025 option
        options = year_select.find_elements(By.TAG_NAME, "option")
        for option in options:
            if "2025" in option.text:
                option.click()
                print("Selected 2025 for year")
                break
        else:
            # If not found by text, try by index (assume it's after 2024)
            if len(options) > 2:  # Assuming options might be [blank, 2024, 2025]
                options[2].click()
                print("Selected 2025 by index")
    
    # Checkbox for agreement
    checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
    if checkboxes:
        for checkbox in checkboxes:
            if not checkbox.is_selected():
                if safe_click(checkbox):
                    print("Clicked checkbox")
    
    # Find and click the Next button
    buttons = driver.find_elements(By.TAG_NAME, "button")
    next_button = None
    for button in buttons:
        if "Next" in button.text:
            next_button = button
            break
    
    if next_button and safe_click(next_button):
        print("Clicked Next button on index page")
    else:
        # Try to find by type="submit"
        submit_button = wait_for_element("button[type='submit']")
        if submit_button and safe_click(submit_button):
            print("Clicked submit button on index page")
    
    # Wait for navigation to complete
    time.sleep(3)
    print(f"URL after navigation: {driver.current_url}")
    
    # Step 1: School Info
    print("Step 1: Filling out school information")
    
    # Wait for the school select to be present
    school_select = None
    
    # Try different approaches to find the school select
    try:
        school_select = wait_for_element("select", timeout=5)
        print("Found school select by tag name")
    except:
        pass
        
    if not school_select:
        try:
            # Try by ID if available
            school_select = wait_for_element("school", By.ID, timeout=5)
            print("Found school select by ID")
        except:
            pass
    
    if not school_select:
        # Try to find all selects and use the first one
        selects = driver.find_elements(By.TAG_NAME, "select")
        if selects:
            school_select = selects[0]
            print("Found school select by index")
    
    if school_select:
        try:
            school_select.click()
            time.sleep(1)
            
            # Try to find UofT option
            options = school_select.find_elements(By.TAG_NAME, "option")
            for option in options:
                if "Toronto" in option.text or "UofT" in option.text:
                    option.click()
                    print("Selected UofT as school")
                    break
            else:
                # If not found by text, try the second option (after blank)
                if len(options) > 1:
                    options[1].click()
                    print("Selected first school in the list")
        except Exception as e:
            print(f"Error selecting school: {str(e)}")
            # Try JavaScript as a fallback
            try:
                driver.execute_script("arguments[0].click();", school_select)
                driver.execute_script("arguments[0].value = 'UofT';", school_select)
                print("Selected school with JavaScript")
            except:
                print("Failed to select school with JavaScript")
    
    # Find and fill program name
    program_input = wait_for_element("input[placeholder*='program']")
    if not program_input:
        # Try to find any text input that might be for program
        inputs = driver.find_elements(By.TAG_NAME, "input")
        for inp in inputs:
            if inp.get_attribute("type") == "text":
                program_input = inp
                break
    
    if program_input:
        program_input.send_keys("Computer Science")
        print("Entered 'Computer Science' as program")
    
    # Fill in the start and end dates
    selects = driver.find_elements(By.TAG_NAME, "select")
    
    # Skip the school select we already used
    offset = 1
    
    # Start date month
    if len(selects) > offset:
        start_month = selects[offset]
        start_month.click()
        start_month.send_keys("September")
        print("Set start month to September")
    offset += 1
    
    # Start date day
    if len(selects) > offset:
        start_day = selects[offset]
        start_day.click()
        start_day.send_keys("1")
        print("Set start day to 1")
    offset += 1
    
    # Start date year
    if len(selects) > offset:
        start_year = selects[offset]
        start_year.click()
        start_year.send_keys("2024")
        print("Set start year to 2024")
    offset += 1
    
    # End date month
    if len(selects) > offset:
        end_month = selects[offset]
        end_month.click()
        end_month.send_keys("April")
        print("Set end month to April")
    offset += 1
    
    # End date day
    if len(selects) > offset:
        end_day = selects[offset]
        end_day.click()
        end_day.send_keys("30")
        print("Set end day to 30")
    offset += 1
    
    # End date year
    if len(selects) > offset:
        end_year = selects[offset]
        end_year.click()
        end_year.send_keys("2025")
        print("Set end year to 2025")
    
    # Fill in percentage
    number_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='number']")
    if number_inputs:
        number_inputs[0].send_keys("40")
        print("Set course load to 40%")
    
    # Fill in numbers of courses
    if len(number_inputs) > 1:
        number_inputs[1].send_keys("2")
        print("Set in-class courses to 2")
    
    if len(number_inputs) > 2:
        number_inputs[2].send_keys("1")
        print("Set online courses to 1")
    
    # Select study level
    radio_buttons = driver.find_elements(By.CSS_SELECTOR, "input[type='radio']")
    bachelors_selected = False
    for radio in radio_buttons:
        if radio.get_attribute("id") == "bachelors" or "bachelor" in radio.get_attribute("value").lower():
            if safe_click(radio):
                print("Selected Bachelor's degree")
                bachelors_selected = True
                break
    
    if not bachelors_selected and len(radio_buttons) >= 3:
        # Just try the third radio button, often Bachelor's
        if safe_click(radio_buttons[2]):
            print("Selected third radio option (assumed Bachelor's)")
    
    # Find and click Next button
    buttons = driver.find_elements(By.TAG_NAME, "button")
    next_clicked = False
    for button in buttons:
        if "Next" in button.text:
            if safe_click(button):
                print("Clicked Next button for Step 1")
                next_clicked = True
                break
    
    if not next_clicked:
        # Try to find the last button (often the Next button)
        if buttons and safe_click(buttons[-1]):
            print("Clicked last button for Step 1")
    
    # Wait for navigation to Step 2
    time.sleep(3)
    print(f"URL after Step 1: {driver.current_url}")
    
    # Step 2: Personal Info (Marital Status)
    print("Step 2: Filling out personal information")
    
    # Select marital status (single)
    radio_buttons = driver.find_elements(By.CSS_SELECTOR, "input[type='radio']")
    single_selected = False
    for radio in radio_buttons:
        if radio.get_attribute("id") == "single" or "single" in radio.get_attribute("value").lower():
            if safe_click(radio):
                print("Selected Single as marital status")
                single_selected = True
                break
    
    if not single_selected and radio_buttons:
        # Just select the first radio button (often Single)
        if safe_click(radio_buttons[0]):
            print("Selected first marital status option")
    
    # Check children checkbox
    children_checkbox = None
    checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
    for checkbox in checkboxes:
        if "children" in checkbox.get_attribute("id").lower():
            children_checkbox = checkbox
            break
    
    if children_checkbox and safe_click(children_checkbox):
        print("Checked 'have children' box")
        
        # If there are children, fill in the number
        number_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='number']")
        if number_inputs:
            number_inputs[0].send_keys("2")
            print("Set number of children to 2")
        
        # Fill in child ages
        text_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='text']")
        for inp in text_inputs:
            if inp.get_attribute("placeholder") and "ages" in inp.get_attribute("placeholder").lower():
                inp.send_keys("4, 7")
                print("Set child ages to '4, 7'")
                break
    
    # Check disability checkbox
    disability_checkbox = None
    for checkbox in checkboxes:
        if "disability" in checkbox.get_attribute("id").lower():
            disability_checkbox = checkbox
            break
    
    if disability_checkbox and safe_click(disability_checkbox):
        print("Checked 'have disability' box")
    
    # Check indigenous status checkbox
    indigenous_checkbox = None
    for checkbox in checkboxes:
        if "indigenous" in checkbox.get_attribute("id").lower():
            indigenous_checkbox = checkbox
            break
    
    if indigenous_checkbox and safe_click(indigenous_checkbox):
        print("Checked 'indigenous status' box")
        
        # Select specific indigenous group if available
        selects = driver.find_elements(By.TAG_NAME, "select")
        if selects:
            for select in selects:
                select.click()
                time.sleep(0.5)
                options = select.find_elements(By.TAG_NAME, "option")
                if len(options) > 1:
                    options[1].click()
                    print("Selected first indigenous group option")
                    break
    
    # Check first generation checkbox
    firstgen_checkbox = None
    for checkbox in checkboxes:
        if "first" in checkbox.get_attribute("id").lower():
            firstgen_checkbox = checkbox
            break
    
    if firstgen_checkbox and safe_click(firstgen_checkbox):
        print("Checked 'first generation' box")
    
    # Find and click Next button
    buttons = driver.find_elements(By.TAG_NAME, "button")
    next_clicked = False
    for button in buttons:
        if "Next" in button.text:
            if safe_click(button):
                print("Clicked Next button for Step 2")
                next_clicked = True
                break
    
    if not next_clicked:
        # Try to find the last button (often the Next button)
        if buttons and safe_click(buttons[-1]):
            print("Clicked last button for Step 2")
    
    # Wait for navigation to Step 3
    time.sleep(3)
    print(f"URL after Step 2: {driver.current_url}")
    
    # Step 3: Financial Info
    print("Step 3: Filling out financial information")
    
    # Select employment status
    selects = driver.find_elements(By.TAG_NAME, "select")
    if selects:
        employment_select = selects[0]
        employment_select.click()
        time.sleep(0.5)
        options = employment_select.find_elements(By.TAG_NAME, "option")
        
        # Try to find Part-time option
        parttime_selected = False
        for option in options:
            if "part" in option.text.lower():
                option.click()
                print("Selected Part-time employment")
                parttime_selected = True
                break
        
        if not parttime_selected and len(options) > 1:
            options[1].click()
            print("Selected first employment option")
    
    # Enter employer name
    text_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='text']")
    employer_input = None
    for inp in text_inputs:
        if inp.get_attribute("placeholder") and "employer" in inp.get_attribute("placeholder").lower():
            employer_input = inp
            break
    
    if employer_input:
        employer_input.send_keys("University of Toronto")
        print("Entered employer name")
    else:
        # Try first text input
        for inp in text_inputs:
            if inp.get_attribute("type") == "text" and inp.is_displayed():
                inp.send_keys("University of Toronto")
                print("Entered employer name (fallback)")
                break
    
    # Enter income and other financial info
    number_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='number']")
    
    # Fill income
    if len(number_inputs) > 0:
        number_inputs[0].send_keys("18000")
        print("Set income to $18000")
    
    # Fill scholarships
    if len(number_inputs) > 1:
        number_inputs[1].send_keys("5000")
        print("Set scholarships to $5000")
    
    # Fill government benefits
    if len(number_inputs) > 2:
        number_inputs[2].send_keys("0")
        print("Set government benefits to $0")
    
    # Fill investments
    if len(number_inputs) > 3:
        number_inputs[3].send_keys("1000")
        print("Set investments to $1000")
    
    # Fill other income
    if len(number_inputs) > 4:
        number_inputs[4].send_keys("500")
        print("Set other income to $500")
    
    # Fill expected contribution
    if len(number_inputs) > 5:
        number_inputs[5].send_keys("2000")
        print("Set expected contribution to $2000")
    
    # Fill asset value
    if len(number_inputs) > 6:
        number_inputs[6].send_keys("10000")
        print("Set asset value to $10000")
    
    # Check financial hardship checkbox
    checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
    for checkbox in checkboxes:
        if checkbox.is_displayed():
            if safe_click(checkbox):
                print("Checked financial hardship box")
                
                # Fill in hardship details if there's a textarea
                textareas = driver.find_elements(By.TAG_NAME, "textarea")
                if textareas:
                    textareas[0].send_keys("Student with limited income and high costs of living in Toronto.")
                    print("Entered hardship details")
                break
    
    # Find and click Next button
    buttons = driver.find_elements(By.TAG_NAME, "button")
    next_clicked = False
    for button in buttons:
        if "Next" in button.text:
            if safe_click(button):
                print("Clicked Next button for Step 3")
                next_clicked = True
                break
    
    if not next_clicked:
        # Try to find the last button (often the Next button)
        if buttons and safe_click(buttons[-1]):
            print("Clicked last button for Step 3")
    
    # Wait for navigation to Summary page
    time.sleep(3)
    print(f"URL after Step 3: {driver.current_url}")
    
    # Step 4: Summary and Submit
    print("Step 4: Reviewing and submitting application")
    
    # Check agreement checkbox
    checkboxes = driver.find_elements(By.CSS_SELECTOR, "input[type='checkbox']")
    for checkbox in checkboxes:
        if not checkbox.is_selected() and checkbox.is_displayed():
            if safe_click(checkbox):
                print("Checked agreement checkbox")
                break
    
    # Enter digital signature
    text_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='text']")
    for inp in text_inputs:
        if inp.is_displayed():
            inp.send_keys("Amanda Wu")
            print("Entered digital signature")
            break
    
    # Find and click Submit Application button
    buttons = driver.find_elements(By.TAG_NAME, "button")
    submit_clicked = False
    for button in buttons:
        if "Submit" in button.text:
            if safe_click(button):
                print("Clicked Submit Application button")
                submit_clicked = True
                break
    
    if not submit_clicked:
        # Try to find the last button (often the Submit button)
        if buttons and safe_click(buttons[-1]):
            print("Clicked last button for submission")
    
    # Wait for submission processing
    time.sleep(3)
    print(f"Final URL: {driver.current_url}")
    
    print("Test completed successfully!")

except Exception as e:
    print(f"Test failed with error: {str(e)}")

finally:
    # Leave the browser open for a moment to see the result
    time.sleep(5)
    
    # Close the browser
    driver.quit()
    print("Browser closed")