import { Card } from "../ui/card";
import MessageCard from "./message-card";

function MessageHistory({ contactList }) {
    return (
        <div>

            <Card className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 md:p-6">
                {
                    contactList && contactList.length > 0 ?
                        [...contactList].reverse().map(item => (
                            <MessageCard
                                messageItem={item}
                                key={item._id}
                            />
                        )) :
                        null
                }

            </Card>
        </div>
    );
}

export default MessageHistory;