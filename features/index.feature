Feature: The Internet Guinea Pig Website

  @INDEX
  Scenario Outline: As a user,  I can navigate to all pages
    Given I am at the index page
    When I click the <page> link
    Then I should be directed to the selected page

    Examples:
      | page                          |
      | A/B Testing                   |
      | Add/Remove Elements           |
      | Broken Images                 |
      | Challenging DOM               |
      | Checkboxes                    |
      | Context Menu                  |
      | Disappearing Elements         |
      | Drag and Drop                 |
      | Dropdown                      |
      | Dynamic Content               |
      | Dynamic Controls              |
      | Dynamic Loading               |
      | Entry Ad                      |
      | Exit Intent                   |
      | File Download                 |
      | File Upload                   |
      | Floating Menu                 |
      | Forgot Password               |
      | Form Authentication           |
      | Frames                        |
      | Geolocation                   |
      | Horizontal Slider             |
      | Hovers                        |
      | Infinite Scroll               |
      | Inputs                        |
      | JQuery UI Menus               |
      | JavaScript Alerts             |
      | JavaScript onload event error |
      | Key Presses                   |
      | Large & Deep DOM              |
      | Multiple Windows              |
      | Nested Frames                 |
      | Notification Messages         |
      | Redirect Link                 |
      | Shadow DOM                    |
      | Shifting Content              |
      | Slow Resources                |
      | Sortable Data Tables          |
      | Status Codes                  |
      | Typos                         |
      | WYSIWYG Editor                |

  @INDEX, @BASIC_AUTH
  Scenario Outline: User can access pages requiring authentication
    Given I authenticate on "<page>" with username "admin" and password "admin"
    Then I should see the page header

    Examples:
      | page                  |
      | Basic Auth            |
      | Digest Authentication |
      | Secure File Download  |
