import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const topMovies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(4)
      .toArray();

    const latestMovies = await db
      .collection("movies")
      .find({})
      .sort({ released: -1 })
      .limit(4)
      .toArray();

    res.json({ top: topMovies, latest: latestMovies });
  } catch (e) {
    console.error(e);
  }
};
