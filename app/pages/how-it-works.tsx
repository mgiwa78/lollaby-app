import { Text } from "@common/Themed";
import React from "react";
import { ScrollView, View } from "react-native";

const HowItWorks = () => {
  return (
    <View
      style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: "#fff" }}
    >
      <ScrollView>
        <Text style={styles.paragraph}>
          Lullabies, those soothing melodies often associated with putting
          babies to sleep, possess a remarkable ability to calm and relax not
          only infants but individuals of all ages. While traditionally used to
          ease babies into slumber, lullabies can also be a powerful tool for
          combating insomnia in adults.
        </Text>
        <Text style={styles.heading3}>Calming Effects</Text>
        <Text style={styles.paragraph}>
          Calming Effects: Lullabies are specifically crafted to have a calming
          effect on the listener. The gentle melodies, soft rhythms, and
          repetitive patterns work together to slow down the heart rate and
          induce a sense of relaxation. For individuals struggling with
          insomnia, listening to a lullaby can help quiet the mind and ease
          tension, making it easier to drift off to sleep.
        </Text>
        <Text style={styles.heading3}>Reduction of Anxiety and Stress</Text>
        <Text style={styles.paragraph}>
          Reduction of Anxiety and Stress: Insomnia is often linked to
          heightened levels of anxiety and stress. Lullabies have been shown to
          reduce these negative emotions by triggering the release of
          neurotransmitters such as serotonin and dopamine, which promote
          feelings of happiness and relaxation. By alleviating anxiety and
          stress, lullabies create a more conducive environment for falling
          asleep.
        </Text>
        <Text style={styles.heading3}>Promotion of Mindfulness</Text>
        <Text style={styles.paragraph}>
          Promotion of Mindfulness: Many lullabies incorporate simple,
          repetitive lyrics or melodies that encourage mindfulness and focus. By
          directing attention to the present moment and away from intrusive
          thoughts or worries, lullabies can help individuals struggling with
          insomnia break the cycle of rumination and mental agitation that often
          accompanies sleeplessness.
        </Text>
        <Text style={styles.heading3}>Association with Sleep</Text>
        <Text style={styles.paragraph}>
          Association with Sleep: Over time, individuals develop associations
          between certain stimuli and sleep. For many people, lullabies are
          strongly associated with bedtime and sleep, having been a part of
          their nighttime routine since infancy. By listening to a familiar
          lullaby, individuals can trigger this association, signaling to the
          brain that it's time to wind down and prepare for sleep.
        </Text>
        <Text style={styles.heading3}>Distracting from External Stimuli</Text>
        <Text style={styles.paragraph}>
          Distracting from External Stimuli: In today's fast-paced world filled
          with noise and distractions, it can be challenging to quiet the mind
          enough to fall asleep. Lullabies act as a soothing buffer against
          external stimuli, creating a cocoon of tranquility that shields the
          listener from disruptive noises and thoughts, allowing them to
          gradually drift off to sleep.
        </Text>
        <Text style={styles.heading3}>Creating a Ritual</Text>
        <Text style={styles.paragraph}>
          Creating a Ritual: Establishing a bedtime ritual is essential for
          promoting healthy sleep patterns. Incorporating lullabies into this
          ritual can signal to the body that it's time to start winding down for
          the night. Whether it's listening to a favorite lullaby before bed or
          singing one to oneself, the consistency of this ritual can help
          regulate the body's internal clock and improve overall sleep quality.
        </Text>
        <Text style={styles.heading3}>Stimulation of the Vagus Nerve</Text>
        <Text style={styles.paragraph}>
          Stimulation of the Vagus Nerve: Some research suggests that listening
          to music, including lullabies, stimulates the vagus nerve, which plays
          a crucial role in regulating various bodily functions, including heart
          rate and digestion. Activation of the vagus nerve induces a state of
          relaxation and promotes feelings of well-being, making it easier to
          fall asleep and stay asleep throughout the night.
        </Text>
        <Text style={styles.heading3}>Mind-Body Connection</Text>
        <Text style={styles.paragraph}>
          Mind-Body Connection: Lullabies engage both the mind and body,
          creating a harmonious connection between the two that is conducive to
          sleep. The gentle melodies and soothing lyrics can help synchronize
          breathing patterns and heart rate, leading to a state of deep
          relaxation that is conducive to falling asleep naturally.
        </Text>
        <Text style={styles.heading3}>Conclusion</Text>
        <Text style={styles.paragraph}>
          In conclusion, lullabies offer a multifaceted approach to combating
          insomnia by promoting relaxation, reducing anxiety and stress,
          fostering mindfulness, creating positive associations with sleep,
          blocking out external stimuli, establishing bedtime rituals,
          stimulating the vagus nerve, and nurturing the mind-body connection.
          Incorporating lullabies into one's nightly routine can be a simple yet
          effective way to improve sleep quality and overcome insomnia.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = {
  paragraph: {
    marginBottom: 10,
    lineHeight: 20,
    fontSize: 15,
  },
  heading3: {
    fontFamily: "ManropeBold",
    fontSize: 20,
  },
};

export default HowItWorks;
