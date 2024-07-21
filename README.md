### INTRODUCTION

The coming of the intelligent transport system has pointed out the critical necessity of accurate traffic forecasting. With advancements in machine learning technology, the objectives of this project include advanced machine learning for effectively predicting traffic jams, the shortest or fastest route by using the historical data of the road with respect to given time, that can significantly increase the efficiency of road network management. The project is also motivated by increased congestion and growing pressure on the demand for real-time traffic management solutions. Therefore, Traffic prediction is a critical ingredient in the modern urban planning field and traffic management. These factors further extend the problems for traffic management in a more significant way in many cities worldwide. A good traffic forecasting system may lessen these burdens, as it provides valuable information about traffic control, route planning, and congestion management. This is the reason behind this application, a System that give the shortest route to users destination and serves as path finder within University of Roehampton London Campus, it will help anyone within the campus to easily locate where they want to go.


### PROBLEM STATEMENT

### What is the problem?​
Traffic congestion in London leads to significant time and economic losses.​
 Navigating the University of Roehampton campus is challenging for newcomers.
 
### Who is affected?
London drivers and commuters.
Students and visitors at the University of Roehampton.



### Where/When does it occur?
In London during peak travel times.
Throughout the year at the University of Roehampton, particularly during the start of semesters.

### Why is it important?
Congestion increases travel costs and time, impacting quality of life and productivity.
 Efficient campus navigation enhances the experience for students, newly employed staff members 
    and visitors.
 
### Methodology - HOW



Searching for the shortest route in a road network system is a fundamental area of research in both Operations Research and Artificial Intelligence (AI). This is particularly relevant for traffic forecasting, where accurately predicting traffic patterns and congestion is crucial. Despite ingenious representations of traffic forecasting problems, some level of search is still required to find optimal solutions.

Historically, search problems were a major focus for AI researchers, as highlighted in early works such as [1]. However, the emphasis on search has diminished over time due to two main reasons. First, the development of fast and sometimes optimal algorithms for many specific areas has reduced the need for extensive searches. When optimal algorithms were not found, it was either because the area was unexplored or because such algorithms were inherently slow. Second, general search techniques, like those implemented in expert systems shells, have been considered adequately effective, reducing the necessity for customized search solutions.

In Operations Research, during the sixties and early seventies, significant attention was paid to the efficiency and memory requirements of search algorithms (see, for instance, [2], [3], [4]). The increase in computational power (in terms of speed and memory size) in subsequent years diminished the importance of these topics. However, with the advent of relatively small and slow microcomputers, focus has once again shifted towards optimizing the implementations of existing algorithms (see, for instance, [5], [6], [7], [8], [9]).

Humans have increasingly sought efficient road network systems to find optimal routes from starting points to destinations, beginning at or after a specified start time \( T_{start} \). The goal is to arrive at the destination as early as possible, adhering to the planned departure time or later, and allowing for departure as late as possible given the earliest arrival time. Experience indicates that many people struggle with planning journeys using traditional road maps. Longer journeys, spanning multiple segments, require consulting multiple schedules simultaneously. Once a route is identified, typically minimal effort is invested in refining the solution or exploring alternatives for different departure times.

Previous efforts to find the fastest routes in public transportation networks were primarily aimed at planning purposes, as referenced in works such as [10] and [11]. However, these attempts did not specifically provide detailed information about travel options within existing transportation networks. Systems used for capacity planning or passenger flow models typically relied on approximate (mean) travel times, which sufficed for those purposes. 

Yet, when the objective shifted to providing precise travel information, a much higher level of detail became essential. This involved using exact departure and arrival times, as well as ensuring accurate connection times within the network system flow (known as connectional margins). Achieving such precision demanded significant computer storage and processing power, which may have deterred earlier attempts. Moreover, the cost of computers with adequate capacity may have been prohibitive for customer service applications in the past.

However, the current availability of relatively inexpensive microcomputers with sufficient capabilities, coupled with the growing importance of customer-oriented applications, has facilitated the development of comprehensive travel information systems and path finder. These advancements have made it feasible to create systems that cater to the specific travel needs of individuals with detailed and accurate information.

The traditional graph representation of road network systems has been found inadequate for accurate representation. To address this, concepts of discrete networks and discrete dynamic networks have been developed. 
In a discrete network, movement between vertices is limited to finite, discrete, predefined possibilities. This contrasts with representing connections through functions that specify varying travel and wait times (as described in [12]). Instead, the very connections themselves are discrete. In a discrete dynamic network, visiting a vertex incurs a cost, which could be zero but might depend on the path's past and future route through the vertex. This adds a temporal and spatial dimension to the network's structure.

Additionally, dynamic networks were introduced, which do not impose discrete connections but still assign a cost to visiting a vertex. These models accommodate more flexible and nuanced representations of real-world transportation systems.

The search algorithms for finding optimal paths in discrete, discrete dynamic, and dynamic networks are distinct due to the nature of their connections and visiting costs.

In discrete and discrete dynamic networks, where connections are discrete and predefined, the definition of an optimal path needs adjustment. To address this, a two-pass algorithm was developed inspired by Dijkstra's algorithm [13]. This algorithm is tailored to navigate the discrete nature of connections and efficiently find optimal paths.

However, in networks with varying visiting costs like discrete dynamic and dynamic networks, the Markov independence principle no longer holds true for optimal solutions. This deviation from traditional shortest path algorithms necessitates novel approaches. 

The two-pass algorithm initially designed for discrete networks has been adapted to handle the complexities of discrete dynamic networks. This adaptation enables efficient pathfinding while accounting for varying costs associated with visiting vertices.


The algorithm designed for searching discrete dynamic networks has been implemented in an operational system called SMART CITY. This system is actively used to navigate the entire road network of London and to find routes within the University of Roehampton campus. Various techniques such as digitization, symmetries, abstraction spaces, and distance estimates are employed to enhance the performance of SMART CITY.

While the concept of the optimal or quickest solution is well-defined, determining the best answer to a user's query is often less straightforward. Users frequently provide overly specific queries that are not always clearly defined. Many factors influence what constitutes the 'best' answer, and users may not articulate all of these factors explicitly. In road travel, for example, the number of available routes is crucial, but additional considerations may also play a role in determining the optimal answer, which can vary case by case.

Given these complexities, it is challenging to define a single best answer based on specific goals and constraints. Instead, techniques such as multiple-objective shortest path methods or finding suboptimal paths for different objectives have been explored. In practice, the approach involves searching for multiple optimal and suboptimal solutions, including potentially the fastest route, and presenting these options to the user with a general "common sense" user model. Ultimately, it is up to the user to decide which solution best fits their needs.

###  GRAPH THEORY
In mathematics, graph theory focuses on the study of graphs, which are mathematical structures used to model pairwise relationships between objects. In this context, a graph consists of vertices (also known as nodes or points) connected by edges (also referred to as arcs, links, or lines). Graphs can be undirected, where edges symmetrically connect two vertices, or directed, where edges asymmetrically connect two vertices. Graphs are a fundamental subject in discrete mathematics.

![image](https://github.com/user-attachments/assets/eb174b9f-7cdf-420b-b7ba-43d89fda84d6)
A drawing of a graph.


### Transport network analysis
A transport network, also known as a transportation network, is a system or graph within a geographic space that outlines the infrastructure enabling and limiting movement or flow. Examples encompass road networks, railways, air routes, pipelines, aqueducts, and power lines. Digitally representing these networks and the techniques for their examination are fundamental to spatial analysis, geographic information systems, public utilities, and transport engineering. Network analysis applies the theories and algorithms of graph theory and constitutes a type of proximity analysis.

### Flow Network
In graph theory, a flow network, also referred to as a transportation network, is a directed graph where each edge has a designated capacity and carries a specific flow. The flow on any given edge cannot exceed its capacity. In operations research, this directed graph is typically called a network, with vertices termed nodes and edges termed arcs. A flow network must adhere to the rule that the total flow into a node equals the total flow out, except for a source node, which only has outgoing flow, or a sink node, which only has incoming flow. Such networks can model various systems, including traffic in computer networks, circulation with demands, fluids in pipes, electrical currents, or any scenario where something moves through a network of nodes.
A network is a directed graph \( G = (V, E) \) characterized by a non-negative capacity function \( c \) for each edge, with no multiple arcs (i.e., no two edges share the same source and target nodes). Typically, it is assumed that if \( (u, v) \in E \), then \( (v, u) \) is also in \( E \). If \( (v, u) \notin E \), we can add \( (v, u) \) to \( E \) and set \( c(v, u) = 0 \).

When two nodes in \( G \) are specified—one as the source \( s \) and the other as the sink \( t \)—the tuple \( (G, c, s, t) \) is referred to as a flow network.

![image](https://github.com/user-attachments/assets/928b84ca-cf37-4054-a561-69ef9897cfd6)
Sample Figure: A flow network showing flow and capacity




### Shortest path problem
In graph theory, the shortest path problem involves identifying a path between two vertices (or nodes) in a graph such that the total weight of its edges is minimized.

For instance, determining the shortest route between two intersections on a road map can be modeled as a specific instance of the shortest path problem in graphs. In this model, vertices represent intersections, edges represent road segments, and each edge is weighted according to the length of the corresponding road segment.




![image](https://github.com/user-attachments/assets/575d3460-02cf-4597-8b34-fda853a68a66)
Shortest path (A, C, E, D, F) between vertices A and F in the weighted directed graph




### 2.1. A Weighted Undirected Graph


A graph G = (V, E) consists of:

- A set of vertices 
- A set of edges 

Each edge e connects a pair of vertices {u,v}, where u and v may be the same or different. The vertices u and v are called the endpoints of edge e. If u and v are the same, e is called a self loop. Edges connecting the same pair of vertices are called parallel.

In a finite graph, both V and E are finite sets. In an undirected graph, the order of the vertices in an edge does not matter.

### Paths

A path is a sequence of edges  such that:
1. Each pair of consecutive edges  and  share a common endpoint, for 0 ≤ i <n.
2. If  is not a self loop, it shares one endpoint with  and another endpoint with  (except for the first edge  and the last edge .

### Weighted Graphs

In a weighted graph, each edge e is assigned a length l(e) . The length of a path P= is the sum of the lengths of its edges:


### Additional Definitions

- A path is simple if no vertex appears more than once.
- A graph is connected if, for every pair of vertices u and v in V, there exists a path that starts at u and ends at v.
- A circuit is a path where the start and end vertices are the same.
- A connected graph which has no circuits is called a tree. 
For an example of a weighted graph, consider Figure 2.1, which includes:

- The set of vertices: {A,B,C,D,E,F}
- The set of edges: {}

In this graph:
- Edges  and  are parallel.
- Edge  is a self loop.

The length of the simple path  is  2 + 9 + 6 = 17 .

The path  forms a simple circuit.

Additionally, the graph depicted in Figure 2.2 is a tree.


Fig. 2.1. A weighted non-directed graph 


Fig. 2.2. A tree 


### 2.2. A Weighted Directed Graph

In a directed graph, the endpoints of an edge have a specific order. The first endpoint is called the start vertex and the second endpoint is called the end vertex. An edge is considered directed from its start vertex to its end vertex. 

- Parallel edges: Edges with the same start and end vertices.
- Antiparallel edges: If u  v and  is directed from u to v while  is directed from v to u, then  and  are antiparallel.

A directed path is a sequence of edges ,,...., such that the end vertex of  is the start vertex of  for 0 ≤ i < n. The length of a directed path and a simple directed path are defined similarly to those in an undirected case.

A directed graph (V, E) is called strongly connected if for every pair of vertices u and v in V, there exists a directed path from u to v and a directed path from v to u. A weighted, directed, strongly connected graph is known as a network.


 ### 2.3. Representing a Road Network by a Graph

A (physical) road network can be represented using a weighted, non-directed, finite graph. 

- Vertices V: Represent the road structures.
- Edges E: Represent the connecting roads.

An edge e connects two vertices u and v if and only if there is a road connecting the road strucrures represented by u and v.

The length of an edge e, denoted l(e), is defined as the distance (in kilometers, for instance) separating the road structures connected by e. The length of a path in the road network is the total distance covered by traveling along that path.

To illustrate this, consider a graph representing a small part of the London Road network, which has been simplified and modified for clarity; see Figure 2.3. This example demonstrates how the distances between road structures can be represented as edge lengths in a graph, and how the total distance of a path can be calculated by summing the lengths of the edges that comprise it.
  

![image](https://github.com/user-attachments/assets/ff530096-c988-4b5d-84e0-59cb1a999c86)

Fig. 2.3. 

![image](https://github.com/user-attachments/assets/7b26071f-beb5-49a7-991d-22d4f99c77b5)

Fig. 2.4.


### Representing a London Road Network by a Graph

### London Road Network

The vertices of the graph represent different road structures in the London Road Network. The edges represent the connecting roads, and the lengths of these edges are the distances used for tariff calculations.

For instance, consider the path:
- Western Avenue > Stonecot Hill > Watford Way > Colchester Road > Western Avenue

The total length of this path is 78 km.

### Example Representation in a Graph

A network of road services can be represented by a weighted directed graph. Here, the road structures are represented by the vertices of the graph. An edge e directed from a start vertex u to an end vertex v represents a traveler moving from the starting point represented by u (e.g., Road A) to the endpoint represented by v (e.g., Road B). The length of an edge is the time it takes to travel from Road A to Road B.

### Specific Example with Three Road Structures

Consider three road structures: Watford Way, Colchester Road, and Western Avenue, with the following travel scenarios:

-Two cars traveling from Watford Way to Colchester Road:
  * Represented by edges  and 
  
- One car traveling from Colchester Road to Colchester Road:
  * Represented by edge 

In this example:
- The vertices are the road structures (Watford Way, Colchester Road, and Western Avenue).
- The directed edges (e.g. , ,, ) represent the travel paths between these road structures.
- The weight of each edge is the travel time between the corresponding roads.


120	140	150	Road
7:40	7:55		Watford Way
7:55	8:05	8:15	Colchester Road 
		8:30	Western Avenue

### Network Representation
The graph representing the London road network is illustrated in Figure 2.4. Here, the vertices correspond to different road structures, and the edges represent the connecting roads with travel times as their weights.

### Path Example
Consider the path:
- Watford Way > Colchester Road > Western Avenue

This path involves traveling:
- From Watford Way  to Colchester Road via edge  (10 minutes)
- From Colchester Road to Western Avenue via edge  (15 minutes)

Thus, the total time spent in the cars is 10 + 15 = 25 minutes.

However, this does not represent the actual trip duration. The trip took 35 minutes because of a 10-minute traffic wait at Colchester Road.

### Explanation of Waiting Time
The waiting time occurs due to the discrete nature of road connections. Unlike an escalator, where movement is continuous, traffic involves specific, discrete times for getting on and off roads. Consequently, time is lost in the gaps between arrival and departure of connections.

- Total trip time: 35 minutes
  - Time spent in cars: 25 minutes
  - Waiting time at Colchester Road: 10 minutes

This example highlights how travel times in a network can be affected by waiting times due to traffic and connection schedules.


### 2.4. Representing Waiting Time

To accurately reflect the total duration of a trip, including waiting times, it is suggested that the waiting time be incorporated into the path length. Some researchers recommend adding an average waiting time to the travel time, as noted in sources such as [14]. For instance, if traffic moves on and off every 10 minutes, an average waiting time of 5 minutes would be included in the travel time.

However, even when the waiting time is conservatively estimated, this method only provides an approximate trip duration. It does not offer precise departure or arrival times. This approach may be suitable for stochastic applications, like capacity planning or passenger flow models, where an average travel time is adequate. Nonetheless, it falls short when specific travel information is necessary.

### Alternative Representation of Waiting Time

An alternative method to represent waiting time is to create two vertices for each station: one for arriving cars and one for departing cars. These vertices are connected by an edge that represents the waiting time. However, determining the length of this waiting edge in advance is challenging because the waiting time depends on the route taken.

Consider the example illustrated in Figure 2.5. How long should the edge be that connects the inflow of Colchester Road to the outflow of Colchester Road? If the arrival was by car 120, the waiting time would be 20 minutes; if by car 140, it would be 10 minutes.

This issue can be resolved by adding one vertex for each arriving car and one vertex for each departing car. A vertex representing an arriving car at a road is connected to a vertex representing a departing car from that road by a waiting edge, provided there is sufficient connection time. The length of the waiting edge corresponds to the specific waiting time.

In this refined model, as shown in Figure 2.6, each arriving car has its own vertex, and each departing car has its own vertex, with edges representing the waiting times between them. This method ensures that the traffic waiting times are accurately reflected based on the actual arrival and departure schedules.

![image](https://github.com/user-attachments/assets/61412072-7dce-4850-a29f-cb985000fbf6)
### Fig.2.5.


![image](https://github.com/user-attachments/assets/119c660e-5ab3-41e5-87ae-d835ced9ad55)
### Fig.2.6.

### 2.5. A Discrete Network

To efficiently and accurately represent discrete connections, a discrete network is proposed. In such a network, the discreteness of connections is reflected in the properties of the edges. A discrete network consists of a finite, weighted, directed graph G = (V, E). Additionally, each edge e in E is associated with two values:
1. start(e): The start value.
2. end(e): The end value, where start(e) < end(e).

The length of an edge e is defined as:
l(e) = end(e) - start(e)

In representing a road network, each car departing from a road is depicted by one edge. The start and end values of the edge correspond to the departure and arrival times of the car. The length of the edge represents the car's travel time.

For instance, in the example provided, if start   is 8:15 and end  is 8:30, then the length  is 15 minutes. This example is illustrated in Figure 2.7.


### Path Length and Connection Cost in a Discrete Network

A path P is represented as a sequence of edges ,,...., . The length of a path P, denoted as l(P), is defined as:

 l(P) = end(P) - start(P)

In a road network, the start and end values of a path correspond to the departure and arrival times, respectively, and the length of the path represents the duration of the trip. For example, considering the path illustrated in Figure 2.7, if the path consists of edges   and   \), the length of the path is:
8:30 - 7:55 = 35 minutes
representing the actual travel time. If the path consists of edges   and , the length becomes: 8:30 - 7:40 = 50  minutes

![image](https://github.com/user-attachments/assets/613b596a-f237-4402-a2be-23f74ee14c92)
Fig.2.7.




A connection along the path is defined as a pair of edges { , }, such that the end vertex of  is the start vertex of . In a road network, a connection corresponds to a pair of connecting road structure, possibly involving a route change. The cost of a connection along the path P, denoted as COST, is defined as:
COST(, ) = start}() - end() for  0 ≤ k < n.

In the context of a road network system, the COST of a connection represents the waiting time of the within the road. The following conditions apply:
(1). The end vertex of  is the start vertex of , for 0 ≤ k < n.
(2). end() ≤ start(), for 0 ≤ k < n.

The start and end of a path P are defined as:
start(P) = start}() 
end(P) = end()







### REFERENCES
[1] N. J. Nilsson, Problem-Solving Methods in Artificial Intelligence. New York: McGraw-Hill, 1971.
[2] M. Pollack and W. Wiebenson, "Solution of the shortest route problem: a review," Operations Research, vol. 8, pp. 224-230, 1960.
[3] J. Gilsinn and C. Witzgall, "A performance comparison of labeling algorithms for calculating shortest path trees," National Bureau of Standards Technical Note 777, 1973.
[4] U. Pape, "Implementation and efficiency of Moore algorithms for the shortest route problem," Mathematical Programming, vol. 7, pp. 212-222, 1974.
[5] R. B. Dial et al., "A computational analysis of alternative algorithms and labelling techniques for finding shortest path trees," Networks, vol. 9, pp. 215-248, 1979.
[6] E. V. Denardo and B. L. Fox, "Shortest-route methods: 1. Reaching, pruning, and buckets," Operations Research, vol. 27, pp. 161-186, 1979.
[7] Glover, E et al., "New polynomially bounded shortest path algorithms and their computational attributes", University of Texas, Austin, Center for Business Decision Analysis,
    1984. 
[8] Pallottino, S., "Shortest path methods: complexity, interrelations and new propositions", Networks, 14, 1984, pp. 257 - 268. 
[9] Vuren, T. van and Jansen, G.R.M., "Recent developments in path finding algorithms: a review", Transportation Planning and Technology, 12, 1988, pp. 57 - 71.
[10] F. Le Clercq, "A public transportation assignment method," Traffic Engineering and Control, June 1972.
[11] G. Gallo and S. Pallottino, "Shortest path methods in transport networks," in Transportation Planning Models, Amsterdam, Elsevier Science Publishers, 1984, pp. 227-256.
[12] K. L. Cooke and E. Halsey, "The shortest route through a network with time-dependent internodal transit times," Journal of Mathematical Analysis and Applications, vol. 14,        pp. 493-498, 1966.
[13] E. W. Dijkstra, "A note on two problems in connection with graphs," Numerische Mathematik, vol. 1, pp. 269-271, 1959.

[14] F. Le Clercq, "A public transportation assignment method," Traffic Engineering and Control, vol. 13, pp. 632-635, June 1972.



