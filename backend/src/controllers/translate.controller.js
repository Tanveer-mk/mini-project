import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const translateTo = async (req, res) => {
  const key = process.env.TRANSLATION_API_KEY;
  const endpoint = "https://api.cognitive.microsofttranslator.com";
  const location = process.env.RESOURCE_REGION;

  const text = req.body?.text;
  const toLanguage = req.body.to;

  const toLanguages = toLanguage.split(",");

  if (!key || !location) {
    return res.status(500).json({
      error: "Missing Azure Translator config in .env",
    });
  }

  try {
    // 1. Detect language
    const detectResponse = await axios.post(
      `${endpoint}/detect?api-version=3.0`,
      [{ text }],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": location,
          "Content-Type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
      }
    );

    const detectedLang = detectResponse.data[0]?.language;

    // 2. Translate to specified languages
    const translateResponse = await axios.post(
      `${endpoint}/translate?api-version=3.0&from=${detectedLang}&to=${toLanguages.join(
        ","
      )}`,
      [{ text }],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": location,
          "Content-Type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
      }
    );

    const translations = translateResponse.data[0]?.translations;

    return res.json({
      originalText: text,
      detectedLanguage: detectedLang,
      translations,
    });
  } catch (error) {
    console.error(
      "Azure Translation Error:",
      error?.response?.data || error.message
    );
    return res.status(500).json({
      error: "Translation service failed.",
      details: error?.response?.data || error.message,
    });
  }
};
