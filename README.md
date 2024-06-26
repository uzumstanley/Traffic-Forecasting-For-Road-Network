### Title : Traffic Forecasting For Road Network
### Course : MSc Data Science
### University : University Of Roehampton London
### Country : United Kingdom

   ###                                                              INTRODUCTION

Traffic congestion in urban areas is a major problem, significantly impacting the economic well-being and quality of life in cities. This issue is particularly acute in large metropolitan areas where population growth and urban expansion exacerbate traffic challenges. Effective traffic forecasting and route optimization for road networks are essential for urban planners and policymakers to manage congestion, improve mobility, and enhance urban living conditions.

[1]London, a prime example of a city grappling with traffic congestion, experienced significant levels of congestion in 2023. Key findings indicate that traffic volumes have remained stable over the last decade, with noticeable declines during the pandemic and subsequent recovery in 2021 and 2022. Post-pandemic traffic levels have remained lower than before, particularly in central and inner London, while outer London saw only a five percent decline compared to 2019. Despite population growth, car use per capita has decreased, reflecting changes in transportation habits.

[2]Congestion statistics for London in 2023 reveal that drivers spent an average of 99 hours stuck in traffic, making it the most congested city in Europe. Average speeds in central London fell by 10 percent to just 10 mph, resulting in an estimated economic loss of £3.8 billion due to congestion. These figures underscore the critical need for advanced traffic forecasting and route optimization methods to manage congestion and prevent substantial economic losses.

This project aims to leverage the Transport for London (TfL) dataset, which contains comprehensive historical traffic data, to predict the shortest or fastest routes within the London road network. By utilizing this dataset, models that provide real-time route optimization can be develop, thereby reducing travel times and congestion. Traditional methods, such as time series analysis and machine learning models, have been used extensively for traffic prediction. However, the complex and dynamic nature of urban traffic requires more sophisticated approaches that can capture both spatial and temporal dependencies in traffic data.

Recent advancements in deep learning, particularly graph neural networks (GNNs), offer a promising solution for traffic forecasting and route optimization. GNNs can model the road network as a graph, where nodes represent traffic sensors or road segments and edges represent the connections between them. By capturing the spatial relationships and integrating temporal patterns, GNNs provide a robust framework for predicting the shortest or fastest routes based on real-time and historical traffic data.

This project will explore and develop advanced traffic forecasting models using the TfL dataset to predict optimal routes in London's road network. By improving the accuracy and efficiency of these predictions, we aim to enhance urban traffic management, reduce congestion, and mitigate its economic impact. This research will contribute to the field of intelligent transportation systems (ITS) and provide practical solutions for urban traffic challenges.





###                                                               PROBLEM STATEMENT








###                                                               AIMS AND OBJECTIVES





###                                                             MOTIVATION/BACKGROUND 










###                                                                   LEGAL 










###                                                                 SOCIAL













###                                                                ETHICAL 













###                                                                   PROFESSIONAL 












###                                                                REPORT OUTLINE










The following sections will review the literature on traffic forecasting methodologies, present the proposed models for route optimization, and discuss the experimental results and their implications for urban traffic management.


###                                                               LITERATURE REVIEW




Traffic forecasting is a critical component of intelligent transportation systems (ITS), aiming to alleviate congestion and improve urban mobility. Various methodologies and models have been proposed to address the challenges of traffic prediction. This literature review explores several key approaches, focusing on the application of deep learning, machine learning, and statistical methods in traffic forecasting.

####                                                  GRAPH DEEP LEARNING-BASED TRAFFIC FLOW PREDICTION

A significant contribution to traffic forecasting comes from the work titled "A Graph Deep Learning-Based Fast Traffic Flow Prediction Method in Urban Road Networks" by Zhang et al. (2023). [3]This study leverages graph neural networks (GNNs) to predict traffic flow, emphasizing the spatial and temporal dependencies in urban road networks. The proposed model, TrafficGraphNet, incorporates spatial features of the road network and temporal patterns of traffic flow, achieving high prediction accuracy and efficiency.

The methodology involves constructing a graph where nodes represent traffic sensors and edges represent road segments. A GNN is employed to capture the spatial dependencies, while a temporal convolutional network (TCN) handles the temporal aspects. The integration of these components enables the model to predict traffic flow effectively, outperforming traditional statistical models and other deep learning approaches【10†source】.

####                                             TRAFFIC CONGESTION FORECASTING MODEL USING CMTF AND MACHINE LEARNING

Another noteworthy study is "A Traffic Congestion Forecasting Model using CMTF and Machine Learning" by Chowdhury et al. (2018). [4]This research addresses traffic congestion prediction by proposing a Circular Model of Traffic Forecasting (CMTF), which integrates machine learning techniques with a node-based approach. The model utilizes traffic density data from sensor networks to forecast congestion levels at intersections.

The CMTF model operates by drawing circles around targeted intersections based on their adjacent nodes, calculating the congestion of these nodes, and using this information for prediction. The study employs time series analysis and the Prophet library for long-term and short-term congestion forecasting, respectively. This method allows for real-time traffic density calculation and provides a robust framework for predicting traffic conditions in urban areas with poor infrastructure and management【10†source】.

####                                                                 COMPARATIVE ANALYSIS AND TRENDS

Comparative studies highlight the advantages and limitations of different traffic forecasting approaches. Traditional methods, such as Kalman filtering and autoregressive integrated moving average (ARIMA) models, have been widely used but often fall short in capturing complex traffic dynamics. In contrast, machine learning models, including neural networks and ensemble methods, have shown improved performance by leveraging large datasets and sophisticated algorithms.

Recent advancements in deep learning, particularly GNNs and recurrent neural networks (RNNs), have further enhanced the capability to model spatial-temporal dependencies. These models benefit from their ability to learn from vast amounts of data, adapt to changing traffic patterns, and provide accurate predictions over various time horizons.

The integration of sensor data, GPS information, and real-time analytics has also played a crucial role in advancing traffic forecasting. Intelligent transportation systems now utilize a capillary network of sensors to monitor traffic variables such as flow, speed, and density, feeding this data into predictive models to manage and control traffic more effectively.                                                          

The reviewed works underscore the evolving landscape of traffic forecasting, highlighting the transition from traditional statistical methods to advanced machine learning and deep learning techniques. The Graph Deep Learning-Based Traffic Flow Prediction by Zhang et al. and the Traffic Congestion Forecasting Model using CMTF by Chowdhury et al. represent significant strides in this domain. These models offer robust frameworks for accurate traffic prediction, paving the way for smarter and more efficient urban transportation systems.











### Description of the "Transport for London Road Network" Dataset

The "Transport for London Road Network" (TLRN) dataset provides comprehensive information about the roads within the Transport for London (TfL) network. This dataset includes various attributes that detail the characteristics and metadata of each road segment. Below is a detailed description of the features included in this dataset:

1. ### TOID (Topographic Identifier)
   - Description: A unique identifier assigned to each road segment in the dataset. This identifier is essential for referencing and distinguishing between different road segments.

2. ### Road Name
   - Description: The name of the road. This feature provides the commonly recognized name used for the road segment, which can be useful for navigation and location purposes.


3. ### Road Class
   - Description: A classification that indicates the road's importance or type within the network. Road classes may include designations such as A roads, B roads, or local roads, each representing different levels of traffic flow and road capacity.


4. ### Road Type
   - Description: Describes the physical characteristics of the road, such as whether it is a primary route, secondary route, or another type. This information can be used to understand the road's design and intended usage.


5. ### TLRN Date
   - Description: The date when the road segment was incorporated into the Transport for London Road Network. This provides historical context for when the road became part of the TfL managed infrastructure.


6. ### Last Updated
   - Description: The date when the information for the road segment was last updated. This helps users assess the currency and relevance of the data.


7. ### Shape__Length
   - Description: The length of the road segment, measured in meters. This geometric attribute is crucial for spatial analysis and mapping.


### Dataset Access

You can explore and interact with the "Transport for London Road Network" dataset through the following link: [TfL Road Network Dataset](https://gis-tfl.opendata.arcgis.com/datasets/TfL::transport-for-london-road-network-tlrn-1/explore?showTable=true).

This dataset is an invaluable resource for urban planners, researchers, and anyone interested in the detailed layout and attributes of London's road network.












###                                                                                  REFERENCES 
[1]. Transport for London report : https://tfl.gov.uk/cdn/static/cms/documents/travel-in-london-2023-road-traffic-trends-acc.pdf

[2]. Inrix traffic scorecard : https://www.standard.co.uk/news/london/traffic-congestion-survey-inrix-london-roads-europe-new-york-b1166590.html

[3]. Yang, D., & Lv, L. (2023). A Graph Deep Learning-Based Fast Traffic Flow Prediction Method in Urban Road Networks. IEEE Access, 11, 93754-93767. doi: 10.1109/ACCESS.2023.3308238.
[4]. Chowdhury, M. M., Hasan, M., Safait, S., Chaki, D., & Uddin, J. (2018). A Traffic Congestion Forecasting Model using CMTF and Machine Learning. *Proceedings of the 2018 Joint 7th International Conference on Informatics, Electronics & Vision (ICIEV) and 2018 2nd International Conference on Imaging, Vision & Pattern Recognition (icIVPR)*. DOI: 10.1109/ICIEV.2018.XXXXX.



