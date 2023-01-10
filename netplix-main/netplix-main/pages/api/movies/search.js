import clientPromise from "../../../lib/mongodb";

const handler = async (req, res) => {
  try {
    const client = await clientPromise;

    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({ ...keyword })
      .sort({ metacritic: -1 })
      .limit(8)
      .toArray();

    res.json({ data: movies });
  } catch (e) {
    console.error(e);
  }
};
export default handler;
