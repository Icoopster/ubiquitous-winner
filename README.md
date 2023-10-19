# ubiquitous-winner
JS project that inports csv and spits out percentages of spending
This uses csv's that art outputted from Navy Federal Credit Union's website. I'm not sure if it will be useful for other people. It also has a Venmo section named after 
my MIL, which will probably not be useful for other people. 
It turns csvs into Arrays of Arrays and then iterates through them comparing them to hardcoded keywords.

Ideally at some point the output will look better, rather than a few console logs, I'd like the keywords to be interactable to show which specific keywords are accumulating the most
wealth. It will also have the option for percentages of spending. And the keywords may eventually be stored in a csv themselves, with an option in the program to populate the keywords
with things that don't match on a later updated csv from the bank. (So scraping descriptions that don't contain keywords and prompting the user to assign them a keyword. Also maybe using
a dictionary for them?

Right now there is no interactivity, and it will only work with a csv renamed example in it's location.
