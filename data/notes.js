class Note {
  id;
  name;
  content;
  lastEdited;

  constructor(noteDetails) {
    this.id = noteDetails.id;
    this.name = noteDetails.name;
    this.content = noteDetails.content;
    this.lastEdited = noteDetails.lastEdited;
  }
}

export const notes = [
  {
    id: "id1",
    name: "My first note",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
    mollitia, molestiae quas vel sint commodi repudiandae consequuntur
    voluptatum laborum numquam blanditiis harum quisquam eius sed odit
    fugiat iusto fuga praesentium optio, eaque rerum! Provident
    similique accusantium nemo autem. Veritatis obcaecati tenetur iure
    eius earum ut molestias architecto voluptate aliquam nihil,
    eveniet aliquid culpa officia aut!

    <br />
    <br />
    Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt
    ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error
    repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
    modi at sunt excepturi expedita sint? Sed quibusdam recusandae
    alias error harum maxime adipisci amet laborum. Impedit sit sunt
    quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas
    aliquid. Perspiciatis minima nesciunt dolorem! Officiis iure rerum
    voluptates a cumque velit quibusdam sed amet tempora. Sit laborum
    ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi
    iusto libero magni deleniti quod quam consequuntur! Commodi minima
    excepturi repudiandae velit hic maxime doloremque. Quaerat
    provident commodi consectetur veniam similique ad earum omnis
    ipsum saepe, voluptas, hic voluptates pariatur est explicabo
    fugiat, dolorum eligendi quam cupiditate excepturi mollitia
    maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat
    non architecto ab laudantium modi minima sunt esse temporibus sint
    culpa, recusandae aliquam numquam totam ratione voluptas quod
    exercitationem fuga. Possimus quis earum veniam quasi aliquam
    eligendi, placeat qui corporis!

    <br />
    <br />
    Perspiciatis minima nesciunt dolorem! Officiis iure rerum
    voluptates a cumque velit quibusdam sed amet tempora. Sit laborum
    ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi
    iusto libero magni deleniti quod quam consequuntur! Commodi minima
    excepturi repudiandae velit hic maxime doloremque. Quaerat
    provident commodi consectetur veniam similique ad earum omnis
    ipsum saepe, voluptas, hic voluptates pariatur est explicabo
    fugiat, dolorum eligendi quam cupiditate excepturi mollitia
    maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat
    non architecto ab laudantium modi minima sunt esse temporibus sint
    culpa.`,
    lastEdited: "April 15, 2024",
  },
  {
    id: "id2",
    name: "Introduction",
    content:
      "my name is uzziel gonzalez how are you doing to day my lady today today lorem",
    lastEdited: "April 12, 2024",
  },
].map((noteDetails) => {
  return new Note(noteDetails);
});
4;
