package com.example.piccolo;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    public static final String PLAYERS = "PLAYERS";
    private EditText editTextOne, editTextTwo, editTextThree, editTextFour, editTextFive;
    private ArrayList<String> players;
    private ArrayList<EditText> editTextControls;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.players  = new ArrayList<>();
        this.editTextControls = new ArrayList<>();
        this.loadControls();
    }

    public void startGame(View view) {
        Intent intent = new Intent(MainActivity.this, GameActivity.class);
        this.loadPlayerNames();
        if (this.players.size() >= 2) {
            intent.putExtra(MainActivity.PLAYERS, this.players);
            startActivity(intent);
        } else {
            Toast.makeText(this, "Du Dackel zu zweit sollte man Saufen nicht allein du Opfah", Toast.LENGTH_LONG ).show();
        }

    }

    private void loadControls() {
        this.editTextOne = findViewById(R.id.inputNameOne);
        this.editTextControls.add(this.editTextOne);
        this.editTextTwo = findViewById(R.id.inputNameTwo);
        this.editTextControls.add(this.editTextTwo);
        this.editTextThree = findViewById(R.id.inputNameThree);
        this.editTextControls.add(this.editTextThree);
        this.editTextFour = findViewById(R.id.inputNameFour);
        this.editTextControls.add(this.editTextFour);
        this.editTextFive = findViewById(R.id.inputNameFive);
        this.editTextControls.add(this.editTextFive);
    }

    private void loadPlayerNames() {
        for (int i = 0; i < this.editTextControls.size(); i++) {
            if (!this.editTextControls.get(i).getText().toString().contentEquals("")) {
                this.players.add(this.editTextControls.get(i).getText().toString());
            }
        }
    }
}
