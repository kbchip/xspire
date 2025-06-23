# 1. Positioning 

## 1.1 Problem Statement

The problem of inefficient food inventory management and lack of awareness about food expiration dates affects households and individuals who purchase groceries regularly; the impact of which is significant financial losses from food waste, environmental harm from unnecessary food disposal, and increased grocery expenses due to having to replace expired items. 

## 1.2 Product Position Statement 

For households and individuals who want to reduce food waste and save money on groceries who struggle to keep track of food expiration dates and frequently discover expired items in their refrigerator or pantry, Xspire is a food inventory management application that provides proactive expiration alerts and intelligent food tracking to prevent waste before it happens. Unlike generic reminder apps or manual tracking methods, our product automatically calculates optimal consumption timing, provides personalized alerts based on food categories, and offers actionable suggestions to use items before they expire. 

## 1.3 Value Proposition and Customer Segment 

Value Proposition: Xspire is a smart food inventory management app that helps households reduce food waste and save money by providing timely expiration alerts, intelligent tracking of food items, and actionable recommendations to consume items before they spoil. 

Customer Segment: Households and individuals who regularly purchase groceries, particularly those who are budget-conscious, environmentally aware, or frequently find expired food in their kitchen. 

# 2. Stakeholders 

**Primary Users** - End users who input food items and receive notifications; responsible for maintaining their food inventory data 

**Grocery Shoppers** - Subset of primary users who actively purchase food and need to track new acquisitions 

**Environmental Advocates** - Users motivated primarily by reducing environmental impact; interested in waste reduction metrics 

**Budget-Conscious Consumers** - Users primarily motivated by financial savings; interested in cost-saving features 

**Food Retailers** - Potential partners who could benefit from reduced returns and improved customer satisfaction 

**Development Team** - Responsible for building, maintaining, and updating the application 

**Competing Apps** - Existing food tracking, reminder, or inventory management applications 

# 3. Functional Requirements 

**Food Item Registration** - Add new food items with expiration dates, categories, and storage locations 

**Expiration Alert System** - Send customizable notifications before items expire 

**Food Inventory Dashboard** - Display current food inventory with visual expiration indicators 

**Barcode Scanning** - Quickly add items by scanning product barcodes with automatic expiration date lookup 

**Smart Expiration Prediction** - Calculate expiration dates based on food type and storage conditions 

**Recipe Suggestions** - Recommend recipes based on items nearing expiration 

**Consumption Tracking** - Mark items as consumed, used, or discarded 

**Waste Analytics** - Track and display food waste patterns and savings over time 

**Shopping List Integration** - Generate shopping lists and avoid duplicate purchases 

**Multi-User Household Support** - Allow multiple family members to access and update the same inventory 

**Food Category Management** - Organize items by categories (dairy, produce, pantry, etc.) 

**Storage Location Tracking** - Track where items are stored (refrigerator, freezer, pantry) 

**Batch Processing** - Handle multiple items with the same expiration date efficiently 

**Export Data** - Allow users to export their food waste and savings data 

**Offline Mode** - Basic functionality when internet connection is unavailable 

# 4. Non-Functional Requirements 

**Performance Efficiency** - The application shall load the main dashboard within 2 seconds on standard mobile devices 

**Usability** - New users shall be able to add their first food item within 30 seconds of opening the app 

**Reliability** – The notification system shall have 99.5% uptime for delivering expiration alerts within 5 minutes 

**Compatibility** - The application shall function on iOS 14+, Android 8+, macOS, and Windows 10+ operating systems 

**Security** - User data shall be encrypted using AES-256 encryption standards 

**Scalability** - The system shall support up to 1000 concurrent users per server instance 

**Maintainability** - Code coverage shall be maintained at minimum 80% for all core functionalities 

**Portability** - The application shall be accessible on modern web browsers, on both desktop and mobile devices 

**Accessibility** - The interface shall comply with WCAG 2.1 AA accessibility standards 

**Data Accuracy** - Food expiration predictions shall be accurate within ±1 day for 90% of common food items 

# 5. MVP 

**MVP Description** - The Minimum Viable Product will focus on core food tracking and expiration alert functionality. The MVP will include: 

Manual food item entry with name, expiration date, and category 

Basic expiration alerts (1-day and 3-day warnings) 

Simple inventory list view showing items sorted by expiration date 

Mark items as consumed or discarded 

Basic waste tracking showing items that expired 

Validation Plan: The MVP will be validated through: 

User Testing - Deploy to 20-30 test users for 2 weeks to track actual usage patterns 

Functionality Testing - Verify alert system accuracy and user interface responsiveness 

Value Measurement - Survey users on perceived value and willingness to continue using the app 

Behavioral Analysis - Measure if users reduce food waste compared to baseline period 

Usability Testing - Conduct task-based testing to ensure users can complete core functions efficiently 

# 6. Use Cases 

## 6.1 Use Case Diagram 

![image](https://github.com/user-attachments/assets/d01cfb40-fc9e-4f8f-84ab-f7cea98f380d)

## 6.2 Use Cases

Name: Receive Expiration Alert  

User Description: User receives notification about items nearing expiration  

Preconditions: User has items in inventory approaching expiration date  

Postconditions: User is informed about expiring items 

### Main Flow: 

System checks inventory for items expiring within alert timeframe 

System generates notification with item details 

System sends push notification to user's device 

User receives and views notification 

User can choose to view full item details or dismiss notification 

System logs notification as delivered 

![penup_20250622_220451](https://github.com/user-attachments/assets/6705e2dd-67ce-4a6a-9b49-df699022926c)

***

Name: View Food Inventory  

User Description: User browses current food inventory  

Preconditions: User has opened the application  

Postconditions: User sees current inventory status 

### Main Flow: 

User selects inventory view 

System retrieves all active food items 

System sorts items by expiration date 

System displays items with color-coded expiration status 

User can filter by category or location 

User can select individual items for more details 

![penup_20250622_222226](https://github.com/user-attachments/assets/470bbba2-490a-4dd1-8d5b-e5fbb8014a72)

***

Name: Mark Item as Consumed  

User Description: User marks food item as consumed or used  

Preconditions: User has items in their inventory  

Postconditions: Item is removed from active inventory and logged for analytics 

### Main Flow: 

User selects item from inventory 

System displays item details 

User selects "Mark as Consumed" option 

System prompts for consumption date (defaults to today) 

User confirms action 

System removes item from active inventory 

System logs consumption for waste analytics 

System displays updated inventory 

![penup_20250622_223614](https://github.com/user-attachments/assets/87f3ea27-4e67-442b-b5da-c86626ed549f)

# 7. User Stories 

## User Story 1 (Priority: High, Estimate: 5 hours) 

As a busy parent, I want to receive push notifications when food items are about to expire so that I can use them before they go bad and avoid wasting money. 

## User Story 2 (Priority: High, Estimate: 8 hours) 

As a household member, I want to quickly add new grocery items to the app so that I can track them without spending too much time on data entry. 

## User Story 3 (Priority: Medium, Estimate: 6 hours) 

As a budget-conscious consumer, I want to see how much money I've saved by preventing food waste so that I can understand the financial benefit of using the app. 

## User Story 4 (Priority: Medium, Estimate: 4 hours) 

As a environmentally conscious user, I want to track how much food waste I've prevented so that I can see my positive environmental impact. 

## User Story 5 (Priority: High, Estimate: 3 hours) 

As a user, I want to see all my food items organized by expiration date so that I can easily identify what needs to be consumed first. 

# 8. Issue Tracker 

GitHub Repository: https://github.com/kbchip/xspire 

![Screenshot 2025-06-22 224520](https://github.com/user-attachments/assets/22bd4963-5773-4e96-804d-2115b840d19c)
