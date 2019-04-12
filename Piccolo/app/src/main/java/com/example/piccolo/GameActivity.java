package com.example.piccolo;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Random;

public class GameActivity extends AppCompatActivity {

    private ArrayList<String> players;
    private ArrayList<String> questionAll;
    private ArrayList<String> questionPlayer;
    private TextView textViewQuestion;
    private Button buttonNext;
    private int counter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        this.textViewQuestion = findViewById(R.id.viewGameTask);
        this.buttonNext = findViewById(R.id.nextTextButton);
        this.questionAll = new ArrayList<>();
        this.questionPlayer = new ArrayList<>();
        this.counter = 0;
        this.loadData();
        this.loadQuestionPerson();
        this.loadQuestionsAll();

        this.textViewQuestion.setText("VORSICHT!" + "\n \n" +
                "Übermäßigter Alkoholkonsum ist schädlich für den Körper! Trinkt verantwortungsbewusst."
                + "\n \n" + " - Eure Piccolo-Game-Programmierer.");

        this.textViewQuestion.setTextColor(this.getResources().getColor(R.color.warningInitalColor));
    }

    private void loadData() {
        Intent intent = getIntent();
        this.players = intent.getStringArrayListExtra(MainActivity.PLAYERS);
    }

    private String getRandomQuestion() {
        this.counter ++;
        Random rand = new Random(System.currentTimeMillis());
        if (rand.nextBoolean()) {
            //questionall
            int randomQuestionNumber = rand.nextInt(this.questionAll.size());
            String randomQuestion = this.questionAll.get(randomQuestionNumber);
            this.questionAll.remove(randomQuestionNumber);
            return randomQuestion;
        } else {
            //randomQuestion player
            int randomQuestionNumber = rand.nextInt(this.questionPlayer.size());
            String randomQuestion = this.questionPlayer.get(randomQuestionNumber);
            this.questionPlayer.remove(randomQuestionNumber);
            //player
            int randomPlayerNumber = rand.nextInt(this.players.size());
            String randomPlayer = this.players.get(randomPlayerNumber);

            return randomPlayer + randomQuestion;
        }
    }
    private void loadQuestionsAll () {
        this.questionAll.add("Warum braucht man überhaupt einen Grund zum Trinken? Trinkt alle 3 Schlücke!");
        this.questionAll.add("Lieber die Simpsons, oder Family Guy? Stimmt alle gleichzeitig ab, die Minderheit muss 4 Schlücke trinken.");
        this.questionAll.add("Trink 2 Schlücke, wenn du schon einmal gegen einen Gegenstand gelaufen bist, während du auf dein Handy geschaut hast.");
        this.questionAll.add("Wenn du denkst du bist cool, dann trink 7 Schlücke.");
        this.questionAll.add("Wenn du hinter deinem Rücken mit den Händen klatschen kannst, dann trinke 5 Schlücke!");
        this.questionAll.add("Macht den klügsten unter euch aus. Dieser muss 3 Schlücke trinken. (Keine Sorge, die paar Gehirnzellen kannst du verkraften).");
        this.questionAll.add("Der letzte, der seine Zunge an sein Getränk hält, muss 3 Schlücke trinken.");
        this.questionAll.add("Spielt eine Runde ich hab noch nie. Jeder der es schon einmal gemacht hat, muss 1 Schluck trinken.");
        this.questionAll.add("Wer von euch nicht sein Fuß bis zum Gesicht bekommt (oder kurz davor) muss 3 Schlücke trinken. Die Evolution lässt bei dir auf sich warten :).");
        this.questionAll.add("Jeder der nicht denkt, dass er Klug wäre, trinkt nicht 3 Schlücke. (#Mindblow)");
        this.questionAll.add("Wenn du schon einmal betrunken eine Nachricht versendet hast und es dann bereut hast, dann trinke 2 Schlücke.");
        this.questionAll.add("Jeder der sich betrunken schon einmal eingestuhlt, oder einuriniert hat, der trinkt 4 Schlücke.");
        this.questionAll.add("Was wärst du Lieber - Huhn oder Ei? Die Minderheit trinkt 3 Schlücke.");
        this.questionAll.add("Wer ist stärker - Wonderwoman oder Iron Man? Die Minderheit trinkt 4 Schlücke.");
        this.questionAll.add("Alle, die ein 'S' im Vornamen haben, trinken 2 Schlücke, falls es mehr als drei sind, trinkt das doppelte.");
        this.questionAll.add("Diejenigen, die schoneinmal drei Tage hintereinander betrunken waren, trinken 3 Schlücke.");
        this.questionAll.add("Trink 4 Schlücke, wenn du schon einmal dir das Furzen verkneifen musstest, als du im Unterricht gessesen bist.");
        this.questionAll.add("Jeder verteilt 2 Schlücke für jedes Mal an dem ihr kotzen musstet, weil ihr zu viel getrunken habt. Schande über euch, was für ein waste!");
        this.questionAll.add("Der/Die jüngste trinkt 2 Schlücke. Du bist ab sofort das Baby unter euch!");
        this.questionAll.add("Sagt nacheinander was ihr gerne für Superkräfte haben würdet und trinkt dabei 2 Schlücke darauf, dass es vermutlich nie passieren wird.");
        this.questionAll.add("Sagt nacheinander Asiatische Länder auf. Derjenige der etwas wiederholt, oder nichts mehr weiß trinkt 2 Schlücke.");
        this.questionAll.add("Trink 3 Schlücke darauf, dass diese App so toll ist! (Wenn es jemand nicht tut, dann hacken wir euch ;) )");
        this.questionAll.add("Trinkt 4 Schlücke auf den Programmierer diese App. Salute!");
        this.questionAll.add("Die Mädels trinken so viele Schlücke, wie auch Jungs am Tisch sitzen und umgekehrt. (Falls divers anwesend, dann sucht es euch aus!)");
        this.questionAll.add("Wer nicht seinen Ellenbogen lecken kann, der trinke 4 Schlücke.");
        this.questionAll.add("Der kleinste trinkt 2 Schlücke - eventuell hilft dir das beim Wachsen, ansonsten wirst du davon einfach Lustig :)");
        this.questionAll.add("Lieber kein Salz mehr, oder kein Zucker? Stimmt alle Gleichzeitig ab, die Minderheit trinkt 3 Schlücke.");
        this.questionAll.add("Lieber keine Pizza mehr, oder keine Nudeln? Stimmt Gleichzeitig ab, die Minderheit trinkt 2 Schlücke. (Beides blöd, also einfach trinken, ohne abzustimmen!)");
        this.questionAll.add("Zählt nacheinander auf, was man sich für 1 Euro leisten kann, wer nichts mehr weiß, oder etwas wiederholt, trinkt 3 Schlücke.");
        this.questionAll.add("Alle die schon einmal etwas geklaut haben trinken 2 Schlücke. (Schande über dich du Lümmel!)");
        this.questionAll.add("Die größte Person unter euch soll versuchen einen Spagat zu machen, falls diese es schafft müssen alle anderen 5 Schlücke trinken. Falls nicht, dann muss der nicht spagatierende 2 Schlücke trinken.");
        this.questionAll.add("Lieber Benzin pinkeln, oder Fanta schwitzen können? Stimmt alle Gleichzeitig ab, die Minderheit trinkt 4 Schlücke. (Benzin brennt, Fanta klebt - überlegt es euch genau!)");
        this.questionAll.add("Wenn ihr danach noch in einen Club geht, dann trinkt 3 Schlücke, ansonsten trinkt der älteste von euch 4 Schlücke!");
        this.questionAll.add("Alle die schon einmal von der NSA ausspioniert wurden, trinken 2 Schlücke. (Eigentlich muss jeder trinken)");
        this.questionAll.add("Lieber vereisten Stuhlgang haben, oder heißen Urin? Stimmt gleichzeitig ab, die Minderheit trinkt 3 Schlücke. (Wie ist die Frage überhaupt hier reingekommen?! Man weiß es nicht)");
        this.questionAll.add("Alle Mädchen, die sich schon einmal vorgestellt haben, mit Justin Bieber, Shawn Mendes, oder andere zusammen zu sein, trinken 3 Schlücke darauf, dass es vermutlich nie passieren wird.");
        this.questionAll.add("Die letzte Person die pinkeln war, trinkt 2 Schlücke. Schande über dich für die Alkoholverschwendung!");
        this.questionAll.add("Wer schon einmal über SMS Schluss gemacht hat trinkt 4 Schlücke. Ihr coldhearted people!");
        this.questionAll.add("Die nächste Person die trinken muss verteilt 5 Schlücke.");
        this.questionAll.add("Zählt nacheinander auf, was man im Zimmer eines Jugendlichen versteckt finden könnte. Die Person die nichts mehr weiß, oder etwas wiederholt trinkt 2 Schlücke.");
        this.questionAll.add("Trinkt 3 Schlücke, wenn ihr schon einmal jemand ins Gesicht gesagt habt, dass die Person hässlich ist. Ihr Monster!");
        this.questionAll.add("Alle die aus dem Süden sind trinken 3 Schlücke. Grüße gehen raus an dieser Stelle!");
        this.questionAll.add("Alle die vergeben sind, geben 2 Schlücke an eine Person ab die nicht vergeben ist. Wählt zusammen aus. #nomobbingandieserstelle");
        this.questionAll.add("Mädels best-of. Wenn ihr mehr als 10 Paar Schuhe habt, dann trinkt 4 Schlücke und denkt darüber nach, welches Paar ihr Morgen anzieht!");
        this.questionAll.add("Zählt nacheinander Synonyme für 'Swag' auf. Die Person die etwas wiederholt, oder nichts mehr weiß trinkt 3 Schlücke.");
        this.questionAll.add("Wer noch nie in Albanien war trinkt 3 Schlücke.");
        this.questionAll.add("Wer schon einaml die typische Handbewegung der Italiener gemacht hat, der trinke 4 Schlücke.");
        this.questionAll.add("Jeder der noch nie eine Schokopizza gegessen hat, der darf 8 Schlücke verteilen. #ehrenmannfrau");
        this.questionAll.add("Wer erst vor kurzem wieder eine Folge Spongebob geschaut hat, darf 4 Schlücke verteilen.");
        this.questionAll.add("Was würdet ihr eher verwenden, falls ihr kein Schmieröl zur verfügung habt - Margarine oder Nivea Creme? Stimmt gleichzeitig ab, die Minderheit trinkt 3 Schlücke.");
        this.questionAll.add("Die Jungs unter euch, die noch nie Handcreme benutzt haben, trinken 3 Schlücke auf ihre 'Männlichkeit'.");
        this.questionAll.add("Wen würdet ihr eher zum Bundeskanzleramt wählen? Gandalf oder Thor. Stimmt gleichzeitig ab. Die Minderheit trinkt 2 Schlücke.");
        this.questionAll.add("Stellt euch vor ihr müsstet gegen ein Waschbären kämpfen und als Waffe habt ihr einen übergroßen Spargel, oder vier tiefgefrorene Bananen zur Auswahl. Stimmt gemeinsam ab, die Minderheit trinkt 3 Schlücke. #basedontruestory");
        this.questionAll.add("Lieber ein Auto mit 400 PS, oder ein sprechendes Auto? Interessiert doch keinen. Trinkt 4 Schlücke!");
        this.questionAll.add("Wenn das Denken der Gedanken ein denkenloses Denken ist, habt ihr dann gedacht zu Denken? Trinkt 2 Schlücke!");
        this.questionAll.add("Alle die Ihre Eltern schon einaml über ihren Beziehungsstatus angelogen haben, trinken 4 Schlücke. Ihr Lüger!");
        this.questionAll.add("Alle die sich schon einmal ein Kondom über den Kopf gezogen haben und ihn dann mit der Nase aufgepustet haben, trinken 3 Schlücke. #hochlebediewissenschaft");
        this.questionAll.add("Zählt nacheinander auf, was die Vorteile sind eine Frau zu sein. Wer etwas wiederholt, oder nichts mehr weiß trinkt 3 Schlücke.");
        this.questionAll.add("Für 100.000 Euro 7 Tage in einem Käfig eingesperrt werden, oder Hundekot (viel Hundekot) für zwei Stunden kneten? Stimmt alle Gleichzeitig ab, die Minderheit trinkt 4 Schlücke.");
        this.questionAll.add("Die Person mit dem geringsten Bartwuchs trinkt 4 Schlücke (Natürlich unter den Männern!).");
        this.questionAll.add("Würdet ihr in einem Paralleluniversum lieber aus dem Mund Furzen, oder schwitzen? Stimmt gleichzeitig ab, die Minderheit trinkt 3 Schlücke. (Wenn man es sich wirklich vorstellt ist das mega Ekelhaft!)");
        this.questionAll.add("Heißt jemand von euch Steffen oder Mirco? Falls ja dürfen diese Personen 10 Schlücke verteilen.");
        this.questionAll.add("Wo ist Bruno? Trinkt 3 Schlücke!");
    }

    private void loadQuestionPerson () {
        this.questionPlayer.add(" verteil so viele Schlücke, wie du schon ausgetrunkene Gläser an diesem Abend hast.");
        this.questionPlayer.add(" mache jemanden ein Kompliment über sein Bein, falls es schlecht ist, trinke 3 Schlücke, ansonsten verteile sie.");
        this.questionPlayer.add(" hast du schon einmal Lippenstift verwendet, falls ja dann trinke 2 Schlücke, ansonsten verteil sie.");
        this.questionPlayer.add(" macht drei Kniebeugen (aber gute Kniebeugen) und trinkt nach jedem zwei Schlücke!");
        this.questionPlayer.add(" zähl alle Vornamen und das Gewicht jeder einzelnen Person am Tisch auf, wenn du abloost, dann trinke 4 Schlücke.");
        this.questionPlayer.add(" wenn du schon einmal auf dem Klo überrascht wurdest (bei was auch immer), dann trinke 3 Schlücke, ansonsten verteil sie.");
        this.questionPlayer.add(" wenn du ein Bart hast, dann trinke 2 Schlücke. (Falls du ein Mädchen bist, dann darfst du das dreifache an Schlücke verteilen, wenn es stimmt).");
        this.questionPlayer.add(" bist du schon einmal zu spät zum Unterricht/Vorlesung gekommen, dann trinke 3 Schlücke als Bestrafung. Aber #Rebell an dieser Stelle!");
        this.questionPlayer.add(" erklärt kurz die Handlung eines Films, ohne dabei Namen oder Filmtitel zu sagen. Die erste Person die es errät, verteilt 4 Schlücke.");
        this.questionPlayer.add(" hast du schon einmal schwarz gearbeitet, dann trinke bitte 3 Schlücke und warte bis der Zoll kommt! Danke für deine Kooperation.");
        this.questionPlayer.add(", wenn du noch nie einen Harry Potter Film gesehen hast, dann schlag dir kurz selber auf den Kopf und trinke 3 Schlücke.");
        this.questionPlayer.add(" trinkt jetzt einfach mal 2 Schlücke. #Opfer");
        this.questionPlayer.add(" trinkt so viel Schlücke, wie er heute telefoniert hat.");
        this.questionPlayer.add(" trinkt 5 Schlücke, dein rechter nachbar einen Schluck weniger und so weiter, bis ihr bei Null angekommen seid.");
        this.questionPlayer.add(" trinkt 2 Schlücke und sagt dabei Lautstark 'Bazinga ihr Leleks' - mit vollem Mund.");
        this.questionPlayer.add(" errate die Farbe der Unterhose deines rechten Nachbar. Wenn es richtig ist verteil 4 Schlücke. Wenn nicht, dann trinke sie selbst.");
        this.questionPlayer.add(" wenn du weniger als 70 kg wiegst, dann trinke 3 Schlücke und freue dich über die paar kcal mehr.");
        this.questionPlayer.add(" hast du schon einmal geschlafen, dann trinken alle anderen 5 Schlücke. #senseless");
        this.questionPlayer.add(" versucht das Alphabet rückwärts aufzusagen, jeder Fehler ist ein Schluck für ihn/sie!");
        this.questionPlayer.add(" trinke 5 Schlücke, wenn du beim Toilettengang zu Hause die Tür offen lässt. Du Ekelbob!");
        this.questionPlayer.add(" ist etwas arroganter als der Durchschnitt? Dann trinkt er/sie 4 Schlücke, ansonsten verteile sie. #Alphakevin");
        this.questionPlayer.add(" wenn du in den letzten vier Wochen ein Buch gelesen hast, dann verteile 7 Schlücke, ansonsten steh auf, geh zur nächsten Bücherei und kauf es dir und währenddessen trinke 3 Schlücke.");
        this.questionPlayer.add(" sag entweder auswendig die Adresse oder eine Telefonnummer deines linken Nachbarn auf, oder trinke 2 Schlücke.");
        this.questionPlayer.add(" zieh ein Kleidungsstück aus, oder trinke 5 Schlücke. #sexymoment");
        this.questionPlayer.add(" erzählt eine peinliche Geschichte über einen anderen Mitspieler am Tisch, oder trinkt 3 Schlücke.");
        this.questionPlayer.add(" schließe die Augen und sag die Augenfarben der Mitspieler am Tisch auf, wenn du fehlschlägst (peinlich), trinke 2 Schlücke.");
        this.questionPlayer.add(" beginnt. Im Kreis, zählt Schauspieler aus den Marvelfilmen auf. Wer nichts mehr weiß trinkt 3 Schlücke.");
        this.questionPlayer.add(" versuche auf einem Bein zu stehen, deine Nase zu berühren und dabei deine Augen im Wechseln zu schließen. Bei einem Fail gibt es 3 Schlücke für dich.");
        this.questionPlayer.add(" hast du schon einmal ein Tanga angehabt? Falls ja, dann trinke 3 Schlücke. Falls du auch noch ein Junge sein solltest, dann trinke das Doppelte! #Strapsenjunge");
        this.questionPlayer.add(" hat jetzt Zahnweh und wie jeder gute Zahnarzt trinkt er erstmal 4 Schlücke gegen die Schmerzen.");
        this.questionPlayer.add(" riecht nach Fisch aus dem Mund. #Ekelhaft. Trinke 3 Schlücke und iss dann eine Zitronenscheibe!");
        this.questionPlayer.add(", wenn du einen Führerschein hast und schon einaml den Motor gestartet hast, ohne dabei die Kupplung gedrückt zu haben, dann trinke 3 Schlücke auf dein Abkacken!");
        this.questionPlayer.add(" sein rechter Nachbar trinkt 3 Schlücke, währenddessen diese(r) komplimente mit vollem Mund ausspricht! (Nicht sabbern!)");
        this.questionPlayer.add(" summe ein Lied deiner Wahl. Wer es errät darf 8 Schlücke verteilen.");
        this.questionPlayer.add(" schenkt eine Runde shotz aus! Prost");
        this.questionPlayer.add(", wenn du rauchst, dann wirf eine Zigarette in den Mülleimer und nimm 4 Schlücke. Falls nicht, dann freut sich deine Lunge, aber deine Leber bekommt 2 Schlücke ab.");
        this.questionPlayer.add(", entscheide wer von euch am sensibelsten ist. Diese Person trinkt 2 Schlücke und versucht mal nicht zu heulen.");
        this.questionPlayer.add(", verteil 5 Schlücke an die Person, mit der du nur peinliches erlebt hast!");
        this.questionPlayer.add(" hast du schon einmal während des Unterrichts dein Handy für außerunterrichtliche Zwecke benutzt? Wer nicht!? Alle anderen trinken 4 Schlücke.");
        this.questionPlayer.add(", denkst du es wäre ok, wenn du jetzt 5 Schlücke trinken müsstest? Da diese App keine Gefühle kennt, tu es einfach!");
        this.questionPlayer.add(", wenn du schon einmal außerhalb der Schule ein Gedicht geschrieben hast, dann trinke 3 Schlücke! #sweetie");
        this.questionPlayer.add(", alle mit denen du bei Snapchat befreundet bist, trinken 3 Schlücke.");
        this.questionPlayer.add(" ist jetzt einfach mal die schönste Person unter euch. Trinkt alle 2 Schlücke darauf!");
        this.questionPlayer.add(" würdest du lieber 15 Schlücke trinken, oder alle 4 Schlücke trinken lassen? Wähle deine Antwort!");
        this.questionPlayer.add(", wenn du älter als 20 bist, dann trinke 3 Schlücke, ansonsten verteile sie!");
        this.questionPlayer.add(", zähl auf wen du magst. Alle die damit einverstanden sind trinken einen Schluck.");
        this.questionPlayer.add(" führe 5 Sekunden einen Stepptanz auf oder trinke 3 Schlücke.");
        this.questionPlayer.add(", wenn du drei Songs von Max Giesinger nennen kannst, dann verteile 3 Schlücke, ansonsten trinke sie!");
        this.questionPlayer.add(", wenn du dir schon einaml auf den Hinter geschlagen hast und dabei gesagt hast 'Hit me baby one more Time', dann verteile 12 Schlücke, ansonsten trinke 3 Schlücke.");
        this.questionPlayer.add(", wenn dein Bartwuchs sehr dünn verteilt ist (also so Fleckenhaft halt), dann trinke 3 Schlücke!");
        this.questionPlayer.add(" ist jetzt der König der Löwen. Versucht ihn hochzuhalten und dann die Szene aus König der Löwen nachzuspielen. Ihr müsst nichts trinken, ist auch so Lustig.");
    }

    public void nextQuestion(View view) {
        if (this.counter == 0){
            this.textViewQuestion.setTextColor(this.getResources().getColor(R.color.defaultColor));
            this.textViewQuestion.setText(this.getRandomQuestion());
        } else if(this.counter < 25) {
            this.textViewQuestion.setText(this.getRandomQuestion());
        } else if (this.counter == 25) {
            this.textViewQuestion.setText(this.getRandomQuestion());
            this.buttonNext.setText("END");
        } else {
            finish();
        }
    }
}




