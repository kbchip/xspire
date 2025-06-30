# System Description
Food waste due to poor inventory tracking is a common problem for households and individuals who regularly purchase groceries. The Xspire application addresses this issue by providing a smart food inventory management system.

## Context
- **Problem Statement**: The problem of inefficient food inventory management and lack of awareness about food expiration dates affects households and individuals who purchase groceries regularly; the impact includes financial loss, increased grocery costs, and environmental waste.

- **Product Positioning Statement**: For households and individuals who want to reduce food waste and save money on groceries and struggle to keep track of expiration dates, Xspire is a food inventory management application that offers proactive expiration alerts and intelligent tracking to prevent waste before it happens.

- **Value Proposition**: Xspire helps users reduce food waste, save money, and positively impact the environment by tracking food inventory and sending timely alerts to avoid spoilage.

## Key Requirements (UML)
The primary actors interacting with the system are **PrimaryUser** and optionally, **HouseholdMember**. Each **PrimaryUser** **_adds_** a new **FoodItem** by informing its _name_, _expirationDate_, _category_, and _storageLocation_. The system uses the **SmartExpirationPredictor** to predict expiration dates (when not supplied by the **PrimaryUser**) based on _category_ and _storageLocation_. Users **_view_** and **_filter_** **FoodItems** within the **FoodInventory** by _category_ and _storageLocation_.

A **PrimaryUser** **_marks_** a **FoodItem** as consumed or discarded through the **ConsumptionTracker**, which logs _consumptionDate_ and updates the _inventoryStatus_. Once an item is logged, **WasteAnalytics** uses this data to generate reports on food waste and financial savings. 

The **ExpirationAlertSystem** **_checks_** the **FoodInventory** regularly to identify **FoodItems** approaching expiration. It then **_triggers_** the **PushNotificationService** to deliver an alert containing the _itemName_, _daysLeft_, and recommended actions. 

Multiple **HouseholdMembers** can **_share_** access to the same **FoodInventory**, supporting multi-user access. The system ensures data security and supports an offline mode for basic functionality without an internet connection. 

**PrimaryUsers** **_view_** **ShoppingLists** based on what is running low, helping avoid duplicate purchases. Furthermore, the **ExpirationAlertSystem** **_provides_** **RecipeSuggestions** based on the available and soon-to-expire items.

# Conceptual Model
