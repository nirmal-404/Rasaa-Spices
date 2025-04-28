

// fetch demo response
export const getTestResponse = async (req, res) => {
    try {
        const demoData = [
            {
                id: 1,
                name: "John Doe",
                email: "",
                message: "Hello, I have a question about your services.",
                createdAt: "2023-10-01T12:00:00Z",  
                status: "Pending",
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "",
                message: "I would like to know more about your pricing.",
                createdAt: "2023-10-02T14:30:00Z",
                status: "Resolved",
            },
            {
                id: 3,
                name: "Alice Johnson",
                email: "",
                message: "Can you provide more details about your services?",
                createdAt: "2023-10-03T09:15:00Z",
                status: "Pending",
            },
            {
                id: 4,
                name: "Bob Brown",
                email: "",
                message: "I have a complaint regarding my last order.",
                createdAt: "2023-10-04T11:45:00Z",
                status: "Resolved",
            },
            {
                id: 5,
                name: "Charlie Davis",
                email: "",
                message: "I would like to schedule a meeting.",
                createdAt: "2023-10-05T16:20:00Z",
                status: "Pending",
            },
            {
                id: 6,
                name: "David Wilson",
                email: "",
                message: "I need assistance with my account.",
                createdAt: "2023-10-06T08:10:00Z",
                status: "Resolved",
            },
            {
                id: 7,
                name: "Eva Green",
                email: "",
                message: "Can you help me with a technical issue?",
                createdAt: "2023-10-07T13:25:00Z",
                status: "Pending",
            },
            {
                id: 8,
                name: "Frank White",
                email: "",
                message: "I have a suggestion for your website.",
                createdAt: "2023-10-08T15:50:00Z",
                status: "Resolved",
            },
        ]

        res.status(200).json({
            success: true,
            data: demoData,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
