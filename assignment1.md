# 1. Assignment

##  Insights got while exploring the data with excel: 

* In general: 
	* United Airlines flights makes up about 50% of all the flights overall, followed by other american based airlines
	* most flights do not have remark
	* number of ingoing vs outgoing flights is about 1:1
* Terminal: 
	** All international (not USA based) airlines are always departing / arriving in terminal I (i18n)
	** terminal 1 mostly consists of gates that begin with a number
	** Inside Terminal 1, only Flights of USA based airlines depart / arrive
	** Terminal 3 is the most busiest terminal with the most flights 
* Layover
	* for certain airlines that flies to a far away destination, e.g. Air China there is certain routine
		** there is a flight to a chinese and from a chinese destination every day
		** CA985 is e.g. always the departing flight
		** CA986 is e.g. always the arriving flight
		** the layover time between CA986 and CA986 is around 2 hours for maintenance and refuelling (the layover time is different e.g. around 15 hours for Japan Airlines JL1 and JL2)
* Remarks and transaction
	* Only a departing flight can have following remarks: Returning, See agent, Returned, Last Call, Departed, Closed, Boarding
	* Only a arriving flight can have following remarks: In range, Arrived

## Gate Assignment

* for a certain flight number (e.g. AA1009 from American Airlines), only departs at SFO and at gates: 56, 57 to 58 (gates always begin with number 5x)
* flights of a certain airline (e.g. Air China), always departs / arrives e.g. at gates that start with Gx 
* certain gate number are used as "arrival gate" (more arrival than departure, e.g. RA18)

## Advice to operation management team: 

* the layover time of a flight (after arrival) variies from time to time, so be fast and efficient as possible during the time period!
