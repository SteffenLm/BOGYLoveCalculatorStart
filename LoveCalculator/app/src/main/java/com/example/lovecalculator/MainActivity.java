package com.example.lovecalculator;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, View.OnFocusChangeListener {

    public final static String RESULT = "RESULT";

    private Button loveIt, reset;
    private EditText editTextSizeOne, editTextSizeTwo, editTextHairOne, editTextHairTwo;
    private Spinner spinnerEyeOne, spinnerEyeTwo;
    private ArrayAdapter<CharSequence> adapter;

    public MainActivity() {
        this.loveIt = null;
        this.reset = null;
        this.editTextSizeOne = null;
        this.editTextSizeTwo = null;
        this.spinnerEyeOne = null;
        this.spinnerEyeTwo = null;
        this.editTextHairOne = null;
        this.editTextHairTwo = null;
        this.adapter = null;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // main initializing
        this.loadControls();
        this.setUpEditTexts();
        this.setUpDropdowns();
        this.setUpButtons();
    }

    @Override
    public void onClick(View view) {
        int sizeOne = Integer.valueOf(this.editTextSizeOne.getText().toString());
        int sizeTwo = Integer.valueOf(this.editTextSizeTwo.getText().toString());
        int sizeIndex = this.calculateSizeFit(sizeOne, sizeTwo);

        String eyeOne = this.spinnerEyeOne.getSelectedItem().toString();
        String eyeTwo = this.spinnerEyeTwo.getSelectedItem().toString();
        int eyeIndex = this.calculateEyeFit(eyeOne, eyeTwo);


        String hairOne = this.editTextHairOne.getText().toString();
        String hairTwo = this.editTextHairTwo.getText().toString();
        int hairIndex = this.calculateHairFit(hairOne, hairTwo);

        final double LOVE_INDEX = (sizeIndex * 0.3 + eyeIndex * 0.3 + hairIndex * 0.3) * 10;
        this.launchResultActivity(LOVE_INDEX);
    }

    @Override
    public void onFocusChange(View v, boolean hasFocus) {
        if (this.editTextSizeOne.getText().toString().contentEquals("")
                || this.editTextSizeTwo.getText().toString().contentEquals("")
                || this.editTextHairOne.getText().toString().contentEquals("")
                || this.editTextHairTwo.getText().toString().contentEquals("")
        ) {
            this.loveIt.setEnabled(false);
        } else {
            this.loveIt.setEnabled(true);
        }
    }

    private void launchResultActivity(double loveIndex) {
        Intent intent = new Intent(this, ResultActivity.class);
        intent.putExtra(RESULT, loveIndex);
        startActivity(intent);
    }

    private int calculateSizeFit(int sizeOne, int sizeTwo) {
        int difference = Math.max(sizeOne, sizeTwo) - Math.min(sizeOne, sizeTwo);
        if (difference > 10) {
            return 0;
        } else {
            return difference;
        }
    }

    private int calculateEyeFit(String eyeOne, String eyeTwo) {
        if (eyeOne.contentEquals(eyeTwo)) {
            //if both have same eye color
            return 10;
        } else if (eyeOne.charAt(0) == eyeTwo.charAt(0)) {
            //if both eye colors start with same character
            return 7;
        } else if (eyeOne.charAt(eyeOne.length() - 1) == eyeTwo.charAt(eyeTwo.length() - 1)) {
            //if both eye colors end with same character
            return 4;
        } else {
            return 1;
        }
    }

    private int calculateHairFit(String hairOne, String hairTwo) {
        String hairText = hairOne + hairTwo;
        int sum = 0;
        for (int i = 0; i < hairText.length(); i++) {
            sum += hairText.charAt(i);
        }
        int hairIndex = sum % 100 + 1;
        return hairIndex / 10;
    }

    private void loadControls() {
        this.loveIt = findViewById(R.id.btnCalculateLove);
        this.reset = findViewById(R.id.btnReset);
        this.editTextSizeOne = findViewById(R.id.editTextSizeOne);
        this.editTextSizeTwo = findViewById(R.id.editTextSizeTwo);
        this.editTextHairOne = findViewById(R.id.editTextHairOne);
        this.editTextHairTwo = findViewById(R.id.editTextHairTwo);
        this.spinnerEyeOne = findViewById(R.id.spinnerEyeOne);
        this.spinnerEyeTwo = findViewById(R.id.spinnerEyeTwo);
    }

    private void setUpEditTexts() {
        this.editTextSizeOne.setOnFocusChangeListener(this);
        this.editTextSizeTwo.setOnFocusChangeListener(this);
        this.editTextHairOne.setOnFocusChangeListener(this);
        this.editTextHairTwo.setOnFocusChangeListener(this);
    }

    private void setUpDropdowns() {
        this.adapter = ArrayAdapter.createFromResource(
                this,
                R.array.eye_colors_array,
                android.R.layout.simple_spinner_item
        );
        this.adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        this.spinnerEyeOne.setAdapter(this.adapter);
        this.spinnerEyeTwo.setAdapter(this.adapter);
    }

    private void setUpButtons() {
        // loveIt button
        this.loveIt.setEnabled(false);
        this.loveIt.setOnClickListener(this);

        // reset button
        this.reset.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        editTextSizeOne.setText("");
                        editTextSizeTwo.setText("");
                        editTextHairOne.setText("");
                        editTextHairTwo.setText("");
                        loveIt.setEnabled(false);
                    }
                });
    }
}
