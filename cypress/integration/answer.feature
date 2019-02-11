Feature: find the answer to life, the universe and everything

  Scenario: find it as a math geek
    Given I am a math geek
    When I search for "the answer to life the universe and everything"
    Then I find "42"

  Scenario: find it as a math idiot
    Given I am a math idiot
    When I search for "how much is seven times six"
    Then I find "42"

