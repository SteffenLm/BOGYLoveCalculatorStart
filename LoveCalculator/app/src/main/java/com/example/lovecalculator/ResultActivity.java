package com.example.lovecalculator;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.TextView;

public class ResultActivity extends AppCompatActivity {

    private Intent intent;
    private TextView resultText;
    private ImageView resultPicture;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        this.resultText = null;
        this.resultPicture = null;
        this.intent = null;
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);
        this.loadControls();
        this.calculateResult();
    }

    private void loadControls() {
        this.intent = getIntent();
        this.resultText = findViewById(R.id.textViewResult);
        this.resultPicture = findViewById(R.id.imageViewSmiley);
    }

    private void calculateResult() {
        double result = this.intent.getDoubleExtra(MainActivity.RESULT, 0);
        this.resultText.setText("Der Loveindex beträgt: " + Math.round(result) + "%");
        if (result < 20) {
            this.resultPicture.setImageResource(R.drawable.smiley_1);
        } else if (result < 40) {
            this.resultPicture.setImageResource(R.drawable.smiley_2);
        } else if (result < 60) {
            this.resultPicture.setImageResource(R.drawable.smiley_3);
        } else if (result < 80) {
            this.resultPicture.setImageResource(R.drawable.smiley_4);
        } else {
            this.resultPicture.setImageResource(R.drawable.smiley_5);
        }
    }
}
