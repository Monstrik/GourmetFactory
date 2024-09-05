
#### **1. Problem Statement**
- **Objective**: Develop a microservices-based solution to emulate a restaurant.
    - **Elements**: POS, kitchen, fridge, delivery, reorder.

#### **2. Technical Requirements**
- **Programming Languages**: Use Node.js for all microservices.
- **Message Broker**: Utilize RabbitMQ for communication between microservices.
- **Database**: Implement a simple database (e.g., SQLite, PostgreSQL) to store order, delivery, and food shelf life data.
- **Microservices Architecture**: Design the system using a microservices architecture, ensuring each service is independent and communicates over network protocols (e.g., HTTP, gRPC).
- **Service Discovery**: Implement service discovery using Consul to enable microservices to dynamically discover and communicate with each other.
- **Containerization**: Use Docker to containerize each microservice.
- **Orchestration**: Deploy and manage the microservices using Kubernetes.
- **Scalability**: Allow users to set the number of service instances at runtime using Kubernetes. The system must monitor and adapt to these changes dynamically.

#### **3. Functional Requirements**
- **POS Service**:
    - Emulate incoming orders from the menu at a rate of n per minute (using static JSON).
    - Expose RESTful APIs to set the number of orders per minute.
    - Communicate with other services via RabbitMQ.
    - **WebSocket Integration**: Send real-time order events to the monitoring Svelte UI.
- **Kitchen Service**:
    - Manage the preparation and status of food orders.
    - Provide APIs for kitchen operations.
    - Use RabbitMQ for inter-service communication.
    - **WebSocket Integration**: Send real-time kitchen events to the monitoring Svelte UI.
- **Fridge Service**:
    - Track the shelf life of prepared food items at three temperature levels (e.g., refrigerated, frozen, room temperature).
    - Alert staff when items are nearing expiration.
    - Provide APIs for shelf life data management.
    - Use RabbitMQ for notifications and updates.
    - **WebSocket Integration**: Send real-time fridge state events to the monitoring Svelte UI.
- **Delivery Service**:
    - Implement an algorithm to optimize delivery routes and times.
    - Provide APIs for delivery scheduling and tracking.
    - Use RabbitMQ for inter-service communication.
    - **WebSocket Integration**: Send real-time delivery events to the monitoring Svelte UI.
- **Reorder Service**:
    - Automatically remove expired items and reorder them as needed.
    - Expose APIs for garbage collection and reorder operations.
    - Communicate with other services via RabbitMQ.
    - **WebSocket Integration**: Send real-time reorder events to the monitoring Svelte UI.

#### **4. User Interface Requirements**
- **UI Framework**: Use Svelte to build the user interface.
- **WebSocket Integration**: Implement WebSocket to provide real-time updates on:
    - Order status
    - Kitchen events
    - Fridge state
    - Delivery events
    - Reorder services
    - Monetary value of discarded items

This ensures that each service can send real-time updates to the Svelte UI, enhancing the monitoring capabilities of the system. Let me know if there's anything else you'd like to adjust!
