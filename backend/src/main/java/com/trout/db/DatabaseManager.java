package com.trout.db;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class DatabaseManager {
  public static void main(String[] args) {
    String creds = System.getenv("HOUSING_DB_MONGO_CREDS");
    String connectionString = "mongodb+srv://" + creds + "@housingCluster.1dqln.mongodb." +
      "net/?retryWrites=true&w=majority&appName=housingCluster";
    ServerApi serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .build();

    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString(connectionString))
        .serverApi(serverApi)
        .build();

    // Create a new client and connect to the server
    try (MongoClient mongoClient = MongoClients.create(settings)) {
      try {
        // Send a ping to confirm a successful connection
        MongoDatabase database = mongoClient.getDatabase("housingDatabase");
        database.runCommand(new Document("ping", 1));
        System.out.println("Pinged your deployment. You successfully connected to MongoDB!");
        
        // Get the data from MongoDB
        MongoCollection<Document> collection = database.getCollection("costs");
        List<Document> documents = new ArrayList<>();
        
        try (MongoCursor<Document> cursor = collection.find().iterator()) {
          while (cursor.hasNext()) {
            Document doc = cursor.next();
            documents.add(doc);
            System.out.println(doc.toJson()); // Debug print
          }
        }
        
        // Convert MongoDB documents to the format frontend expects
        JSONObject rootObject = new JSONObject();
        JSONArray apartmentsArray = new JSONArray();
        
        int id = 1;
        for (Document doc : documents) {
            JSONObject apartment = new JSONObject();
            
            // Map MongoDB fields to frontend fields
            // Adjust these field names based on your actual MongoDB schema
            apartment.put("id", id++);
            apartment.put("name", doc.getString("name"));
            apartment.put("price", "$" + doc.getInteger("price"));
            apartment.put("complex", doc.getString("complex"));
            
            apartmentsArray.put(apartment);
        }
        
        rootObject.put("apartments", apartmentsArray);
        
        // Write to JSON file
        
        // String filePath = "../../../../../../frontend/src/apartmentsData.json"; // Adjust path as needed
        String filePath = "C:\\Users\\theel\\OneDrive\\Stuff\\BYU\\Winter2025\\Sandbox\\code\\frontend\\src\\apartmentsData.json";
        try (FileWriter file = new FileWriter(filePath)) {
            file.write(rootObject.toString(2)); // Pretty print with 2-space indentation
            System.out.println("JSON file successfully created at: " + filePath);
        } catch (IOException e) {
            System.err.println("Error writing to JSON file: " + e.getMessage());
            e.printStackTrace();
        }
        
      } catch (MongoException e) {
        System.err.println("MongoDB error: " + e.getMessage());
        e.printStackTrace();
      }
    }
  }
}