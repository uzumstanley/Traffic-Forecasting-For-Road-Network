### INTRODUCTION

The coming of the intelligent transport system has pointed out the critical necessity of accurate traffic forecasting. With advancements in machine learning technology, the objectives of this project include advanced machine learning for effectively predicting traffic jams, the shortest or fastest route by using the historical data of the road with respect to given time, that can significantly increase the efficiency of road network management. The project is also motivated by increased congestion and growing pressure on the demand for real-time traffic management solutions. Therefore, Traffic prediction is a critical ingredient in the modern urban planning field and traffic management. These factors further extend the problems for traffic management in a more significant way in many cities worldwide. A good traffic forecasting system may lessen these burdens, as it provides valuable information about traffic control, route planning, and congestion management. This is the reason behind this application, a System that give the shortest route to users destination and serves as path finder within University of Roehampton London Campus, it will help anyone within the campus to easily locate where they want to go.


Searching for the shortest route in a road network system is a fundamental area of research in both Operations Research and Artificial Intelligence (AI). This is particularly relevant for traffic forecasting, where accurately predicting traffic patterns and congestion is crucial. Despite ingenious representations of traffic forecasting problems, some level of search is still required to find optimal solutions.

Historically, search problems were a major focus for AI researchers, as highlighted in early works such as [1]. However, the emphasis on search has diminished over time due to two main reasons. First, the development of fast and sometimes optimal algorithms for many specific areas has reduced the need for extensive searches. When optimal algorithms were not found, it was either because the area was unexplored or because such algorithms were inherently slow. Second, general search techniques, like those implemented in expert systems shells, have been considered adequately effective, reducing the necessity for customized search solutions.

In Operations Research, during the sixties and early seventies, significant attention was paid to the efficiency and memory requirements of search algorithms (see, for instance, [2], [3], [4]). The increase in computational power (in terms of speed and memory size) in subsequent years diminished the importance of these topics. However, with the advent of relatively small and slow microcomputers, focus has once again shifted towards optimizing the implementations of existing algorithms (see, for instance, [5], [6], [7], [8], [9]).

Humans have increasingly sought efficient road network systems to find optimal routes from starting points to destinations, beginning at or after a specified start time \( T_{start} \). The goal is to arrive at the destination as early as possible, adhering to the planned departure time or later, and allowing for departure as late as possible given the earliest arrival time. Experience indicates that many people struggle with planning journeys using traditional road maps. Longer journeys, spanning multiple segments, require consulting multiple schedules simultaneously. Once a route is identified, typically minimal effort is invested in refining the solution or exploring alternatives for different departure times.

Previous efforts to find the fastest routes in public transportation networks were primarily aimed at planning purposes, as referenced in works such as [10] and [11]. However, these attempts did not specifically provide detailed information about travel options within existing transportation networks. Systems used for capacity planning or passenger flow models typically relied on approximate (mean) travel times, which sufficed for those purposes. 

Yet, when the objective shifted to providing precise travel information, a much higher level of detail became essential. This involved using exact departure and arrival times, as well as ensuring accurate connection times within the network system flow (known as connectional margins). Achieving such precision demanded significant computer storage and processing power, which may have deterred earlier attempts. Moreover, the cost of computers with adequate capacity may have been prohibitive for customer service applications in the past.

However, the current availability of relatively inexpensive microcomputers with sufficient capabilities, coupled with the growing importance of customer-oriented applications, has facilitated the development of comprehensive travel information systems and path finder. These advancements have made it feasible to create systems that cater to the specific travel needs of individuals with detailed and accurate information.



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







