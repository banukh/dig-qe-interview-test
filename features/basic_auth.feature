Feature: The Internet Guinea Pig Website

  @BASIC_AUTH
  Scenario: Successful basic auth
    Given I use basic auth to login with "admin" and "admin"
    Then I should see a paragraph saying "Congratulations! You must have the proper credentials."

  @BASIC_AUTH
  Scenario: Failed basic auth
    When I send invalid basic auth with "foo" and "bar"
    Then I should get a 401 unauthorized response
