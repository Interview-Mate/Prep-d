export default function PastInterview({ interview }: { interview: any }) {
  const cleanArr = interview.conversation.slice(1);
  //need to render last element differently
  const feedback = interview.conversation.pop();

  return (
    <div className="past-interview">
      {interview.date}
      {cleanArr.map((convo: any, index: number) => (
        <>
          <div className={index % 2 === 0 ? "left-convo" : "right-convo"}>
            {convo.content}
          </div>
        </>
      ))}
    </div>
  );
}
