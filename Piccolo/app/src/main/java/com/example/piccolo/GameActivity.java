package com.example.piccolo;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import java.util.ArrayList;

public class GameActivity extends AppCompatActivity {

    private ArrayList<String> players;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        this.loadData();
    }

    private void loadData() {
        Intent intent = getIntent();
        this.players = intent.getStringArrayListExtra(MainActivity.PLAYERS);
    }
}




