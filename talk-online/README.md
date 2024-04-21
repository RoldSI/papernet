# talkOnline
Talk.Online
Visit the site
https://talk.online/

For a general overview of the smart contract function and purpose, read the whitepaper. talkForum is the key forum used to focilitate on chain posts and voting. Utilize voting in a creative way for treasury managment or some other DAO purpose. 


# The updated talkForum.sol file does the following:

* **A list of upvoters and downvoters -** is maintained for each research paper posted. 
* **Waits for the total number of votes to reach a threshold -** it has been set to 11
* **Consensus is calculated by comparing proScore and conScore -**  if proScore > conScore, the paper is approved and added to the pool of published papers and the upvoters are rewarded in TALK tokens. if proScore < conScore, the paper is discarded and the downvoters are rewarded in TALK tokens.
* **The users who voted in favour of the consensus -** also get an increase in count of successfully reviewed papers for their social profile
* **If the paper is approved and published -** the author(s) also get an increase in count of published papers for their social profile
* **Scientists can create unique ERC-721 tags -** for their successfully published original research works

<p align="center">
  <img src= "account.png"/>
</p>

