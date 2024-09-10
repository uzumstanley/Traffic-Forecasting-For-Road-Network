### Title:Traffic Forecasting For Road Network 
### Subtitle: Optimizing Routes in London and University of Roehampton

### Abstract
Traffic congestion in London leads to significant time delays and economic losses, while navigating specific locations, such as the University of Roehampton campus, poses challenges, particularly for newcomers. These issues affect a wide range of users, including commuters, drivers, students, staff, and visitors. Addressing these challenges is crucial to enhancing quality of life, reducing travel costs, and improving the efficiency of transportation systems.

### Introduction
Traffic congestion and navigation inefficiency are pressing issues in metropolitan areas such as London. Addressing these challenges can save time and reduce economic losses significantly. According to the INRIX 2022 Global Traffic Scorecard, London is the most congested city globally, with drivers losing an average of 156 hours in traffic annually. In the UK, the average driver lost 80 hours to congestion, reflecting a 7-hour increase from 2021, though still 35 hours less than in 2019. The annual cost of congestion in London amounted to £1,377 per driver, with UK drivers losing an average of £707. Additionally, rising fuel costs added £212 for London commuters and £122 nationally [1].

Globally, drivers in the top five congested cities were: London (156 hours), Chicago (155 hours), Paris (138 hours), Boston (134 hours), and New York (117 hours). Most UK cities, including London, have met or exceeded pre-COVID congestion levels, with Londoners experiencing a 5% increase over pre-pandemic delays. This surge in traffic congestion underscores the urgent need for effective traffic management to mitigate economic losses and improve the quality of life for commuters [1].

A recent report from the leading Global Positioning System (GPS) company TomTom highlighted that traffic congestion results in significant losses in time and energy consumption, with commuters in major cities worldwide spending approximately 75% more time traveling than necessary [2]. The rapid increase in the number of vehicles and the high percentage of the global population living in urban areas are key factors contributing to this issue. Enhancing traffic congestion management and implementing optimal route-planning algorithms could benefit over 3 billion people by reducing energy consumption and aiding in mitigation of global warming. One effective strategy to reduce urban traffic is optimizing traffic flow for more efficient routing. An improved vehicle routing system would lead to better utilization of all nearby road networks [3].

Maps are fundamental tools for presenting and analyzing information on the spatial distribution of business sectors, resources, and individuals requiring services, as well as for determining locations. Woodbury (1996) noted that 85% of all computerized databases globally include a location component, such as a street address, zip code, census tract, or legal description. Geographic Information System (GIS) technology is currently one of the most prominent new research tools and one of the fastest-growing high-tech monitoring systems [4].

Analysing road networks is crucial for generating accurate and effective information about roads, aiding decision-makers in selecting optimal routes through mathematical calculations involving dynamic programming [5, 6]. Determining the optimal route is a prevalent research topic in transportation literature [7]. Most technologies used in today's applications, such as Google Maps, which assist vehicle drivers in choosing the best route—whether it is the shortest distance, least time, or most economical—utilize Dijkstra's algorithm [8].


![image](https://github.com/user-attachments/assets/b46554bb-22d0-4609-af14-b3e34f44fd31)

Figure 1. United Kingdom Road Network System



Limitations of Dijkstra's Algorithm and Alternatives
While Dijkstra's algorithm is widely used for finding the shortest path in a graph, it has some limitations:
1.Complexity in Large Networks: Dijkstra's algorithm can be computationally intensive, especially in large road networks with many nodes and edges.
2.Assumes Positive Weights: The algorithm assumes all edges have non-negative weights, which might not be applicable in all real-world scenarios (e.g., certain cost factors could be negative).
Single Source Limitation: Dijkstra's algorithm finds the shortest path from a single source node to all other nodes. It isn't inherently designed for scenarios where multiple source-destination pairs need to be optimized simultaneously.

Alternative Algorithms:
A* (A-star) Algorithm: This is a more efficient alternative that uses heuristics to speed up the search, particularly in large networks. A* is often preferred in scenarios where a path must be found quickly, such as in real-time navigation systems.
Bellman-Ford Algorithm: Unlike Dijkstra’s, Bellman-Ford can handle graphs with negative weight edges. It is slower but can be useful when dealing with specific types of transportation networks where certain paths may have negative costs.
Floyd-Warshall Algorithm: This algorithm is used to find the shortest paths between all pairs of nodes in a weighted graph. It is useful in dense graphs and for scenarios where multiple route optimizations are required.
By improving traffic management, cities can reduce economic losses and enhance productivity[7]. This project aims to develop a system that provides optimal routes for travelers within London and aids in effortless navigation within the University of Roehampton campus. The system leverages Dijkstra's algorithm to determine the shortest route from the traveler’s starting point to their destination. By offering real-time, optimized routing solutions, the system addresses traffic congestion problems by directing travelers through the shortest paths, thereby reducing travel time and enhancing overall efficiency.




### 1.1 Problem Description, Context and Motivation
Traffic congestion in London remains a persistent issue, leading to significant time delays and economic losses. According to the INRIX 2022 Global Traffic Scorecard, the average London driver lost £1,377 in time due to congestion, which severely impacts productivity and economic efficiency across the city [1]. This congestion exacerbates daily challenges for commuters, who face increased travel times and higher transportation costs. The ripple effect of this congestion affects not only individual drivers but also the broader economy, as delays contribute to lost working hours, increased fuel consumption, and environmental degradation due to higher emissions.



In addition to citywide congestion, navigating specific locations such as the University of Roehampton campus presents its own set of challenges. For newcomers—including students, visitors, and newly employed staff—the intricacies of the campus layout can be difficult to navigate, particularly during peak times such as the start of semesters. The lack of familiarity with campus roads and pathways, combined with inadequate signage or crowded conditions, can lead to confusion and frustration, ultimately impacting the overall experience of those who are new to the campus environment.
The primary individuals affected by these issues include London drivers and commuters who experience daily delays and face increased travel costs. Similarly, University of Roehampton students and visitors often struggle with navigation difficulties, especially during busy periods. The challenges of navigating the campus are particularly pronounced for new students and staff who are still familiarizing themselves with the layout of the university.
Addressing London traffic congestion is crucial for reducing travel costs and time, which in turn enhances the quality of life and productivity for commuters. Effective traffic management strategies can lead to substantial economic savings, a reduction in pollution, and a more efficient transportation system that benefits all users. Similarly, improving campus navigation at the University of Roehampton is essential for providing a positive experience for students, staff, and visitors. Streamlining campus navigation not only facilitates easier access to campus facilities but also reduces the time and stress associated with finding one’s way around. This is particularly important in an academic 
