import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Card } from "../ui/card";
import { useState } from "react";
import { Trash } from "lucide-react";

function MessageListItem({ messageItem, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMessage = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b last:border-none">
            <div className="flex-1 flex-col mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">{messageItem?.inquiryType}</h3>
                <p className="text-gray-700">
                    {isExpanded
                        ? messageItem?.message
                        : messageItem?.message.length > 40
                            ? `${messageItem?.message.substring(0, 40)}...` : messageItem?.message}
                </p>
                {messageItem?.message.length > 40 && (
                    <Button variant="link" size="sm" onClick={toggleMessage}>
                        {isExpanded ? "Hide" : "See more"}
                    </Button>
                )}
                <p className="text-sm text-gray-500 mt-2">{format(new Date(messageItem?.createdAt), "PPp")}</p>
            </div>
            <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                <div className="flex gap-2">
                    <Button variant="destructive" size="sm" onClick={() => onDelete(messageItem)}>
                        <Trash />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default MessageListItem;
