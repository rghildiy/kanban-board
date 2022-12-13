// Function to create a palindrome
function makeLexicographicallySmallestPalindrome(s) {
  let R = '';
  let cnt = {};
  // console.log(cnt);
  // Count the occurrences of
  // every character in the string
  for (let i = 0; i < s.length; i++) {
    let a = s[i];
    if (!cnt[a]) {
      cnt[a] = 1;
    } else {
      cnt[a] += 1;
    }
  }

  // Create a string of characters
  // with odd occurrences
  k = 97;
  while (k <= 122) {
    let i = String.fromCharCode(k);

    if (!cnt[i]) {
      cnt[i] = 0;
    }
    // console.log(cnt[i]);
    if (cnt[i] % 2 != 0) {
      R += i;
    }
    // console.log(String.fromCharCode(k));
    k++;
  }

  let l = R.length;
  let j = 0;

  // // Change the created string upto
  // // middle element and update
  // // count to make sure that only
  // // one odd character exists.
  for (let i = l - 1; i >= parseInt(l / 2); i--) {
    // decrease the count of
    // character updated
    // console.log(cnt[R[i]]);
    // console.log(R[j]);
    cnt[R[i]]--;
    R = R.substring(0, i) + R[j];
    // R[i] = R[j];
    // console.log(R[i]);
    cnt[R[j]]++;
    j++;
  }
  // Create three strings to make
  // first half second half and
  // middle one.
  let first = '';
  let middle = '';
  let = second = '';

  let p = 97;
  for (let p = 97; p <= 122; p++) {
    let i = String.fromCharCode(p);
    if (!cnt[i]) {
      cnt[i] = 0;
    }

    if (cnt[i] != 0) {
      // characters with even occurrences
      if (cnt[i] % 2 == 0) {
        let j = 0;

        // fill the first half.

        while (j < parseInt(cnt[i] / 2)) {
          // console.log(i);
          first += i;
          // console.log(first);
          j++;
        }
      }

      // character with odd occurrence
      else {
        let j = 0;

        // fill the first half with
        // half of occurrence except one
        // console.log((cnt[i]));
        while (j <= (cnt[i] - 1) / 2) {
          first += i;
          // console.log(first);
          j++;
        }

        // For middle element
        middle += i;
        // console.log(middle);
      }
    }
  }

  // create the second half by
  // reversing the first half.
  second = first;
  //  console.log(second);
  second = second.split('').reverse().join('');
  // // reverse(second.begin(), second.end());
  let resultant = first + middle + second;
  console.log(resultant);
}

console.log(makeLexicographicallySmallestPalindrome('fhaigh'));
